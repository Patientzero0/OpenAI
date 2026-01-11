import os
import json
import requests
import numpy as np
import pyttsx3
from groq import Groq
from dotenv import load_dotenv
from PIL import Image, ImageDraw, ImageFont
from moviepy import VideoFileClip, ImageClip, CompositeVideoClip, concatenate_videoclips, AudioFileClip
import tempfile
from pathlib import Path

load_dotenv()

PEXELS_KEY = os.getenv("PEXELS_API_KEY")
GROQ_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_KEY:
    raise ValueError("GROQ_API_KEY not found in .env file")

if not PEXELS_KEY:
    raise ValueError("PEXELS_API_KEY not found in .env file")

client = Groq(api_key=GROQ_KEY)

# Create output directory
# Use relative path that works both from project root and backend directory
OUTPUT_DIR = os.path.join(os.getcwd(), "marketing_videos")
# Also try backend/marketing_videos for compatibility
if not os.path.exists(OUTPUT_DIR):
    alt_output_dir = os.path.join(os.getcwd(), "backend", "marketing_videos")
    if os.path.exists(alt_output_dir):
        OUTPUT_DIR = alt_output_dir
    else:
        # Create marketing_videos in current directory
        OUTPUT_DIR = "marketing_videos"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/temp", exist_ok=True)


def generate_marketing_plan(brand_type):
    """Generate marketing plan using Groq"""
    prompt = f"""
You are a social media marketing expert.

Generate a short-form video plan for promoting a {brand_type}.

Return STRICT JSON with this exact structure:
{{
  "search_terms": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "captions": ["caption1", "caption2", "caption3", "caption4", "caption5"],
  "voiceover": ["narration1", "narration2", "narration3", "narration4", "narration5"],
  "cta": "final call to action text"
}}

Rules:
- Use 5 search terms for 20-30s video
- Captions must be under 6 words, punchy and bold
- Voiceover should be engaging, 1-2 sentences per clip
- Search terms should be visually dynamic
- Tone: promotional, trendy, urgent
- Optimized for Instagram Reels/TikTok
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        content = response.choices[0].message.content
        return json.loads(content)
    except Exception as e:
        print(f"Error from Groq API or JSON parsing: {e}")
        if 'response' in locals():
            print(f"Groq API raw response: {getattr(response, 'choices', None)}")
        raise


def fetch_pexels_videos(query, count=3):
    """Fetch videos from Pexels API"""
    url = "https://api.pexels.com/videos/search"
    headers = {"Authorization": PEXELS_KEY}
    params = {
        "query": query, 
        "per_page": count,
        "orientation": "portrait"
    }

    try:
        resp = requests.get(url, headers=headers, params=params, timeout=10)
        if resp.status_code != 200:
            print(f"Pexels API error: {resp.status_code} {resp.text}")
            return []
        res = resp.json()
    except Exception as e:
        print(f"Error fetching from Pexels: {e}")
        return []

    videos = []
    for v in res.get("videos", []):
        hd_files = [f for f in v["video_files"] if f["quality"] == "hd"]
        if hd_files:
            best = max(hd_files, key=lambda x: x["width"])
        else:
            best = max(v["video_files"], key=lambda x: x["width"])
        videos.append({
            "url": best["link"],
            "duration": v["duration"]
        })

    return videos


def download_video(url, filename):
    """Download video from URL"""
    try:
        r = requests.get(url, stream=True, timeout=30)
        with open(filename, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        return True
    except Exception as e:
        print(f"Error downloading video: {e}")
        return False


def generate_audio(text, filename):
    """Generate TTS audio using pyttsx3"""
    try:
        engine = pyttsx3.init()
        engine.setProperty('rate', 160)
        engine.setProperty('volume', 1.0)
        
        voices = engine.getProperty('voices')
        if len(voices) > 1:
            engine.setProperty('voice', voices[1].id)
        
        engine.save_to_file(text, filename)
        engine.runAndWait()
        return True
    except Exception as e:
        print(f"Error generating audio: {e}")
        return False


def create_bold_text_clip(text, size, duration, position='bottom'):
    """Create bold, outlined text with background"""
    width, height = size
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("arialbd.ttf", 90)
    except:
        font = ImageFont.load_default()
    
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) // 2
    y = height - text_height - 100 if position == 'bottom' else (height - text_height) // 2
    
    # Draw background rectangle
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    padding = 30
    bg_bbox = [x - padding, y - padding, x + text_width + padding, y + text_height + padding]
    overlay_draw.rounded_rectangle(bg_bbox, radius=20, fill=(0, 0, 0, 180))
    img = Image.alpha_composite(img, overlay)
    
    # Draw text
    draw = ImageDraw.Draw(img)
    draw.text((x, y), text, font=font, fill=(255, 255, 255, 255))
    
    # MOVIEPY V2 FIX: use .with_duration instead of .set_duration
    return ImageClip(np.array(img)).with_duration(duration).with_opacity(0.95)


def build_marketing_video(video_files, captions, voiceovers, cta, output):
    """Build the final marketing video"""
    clips = []
    
    for i, file in enumerate(video_files):
        try:
            clip = VideoFileClip(file)
            
            # MOVIEPY V2 FIX: subclip -> subclipped
            clip_duration = min(4, clip.duration)
            start_time = max(0, (clip.duration - clip_duration) / 2)
            clip = clip.subclipped(start_time, start_time + clip_duration)
            
            # MOVIEPY V2 FIX: resize -> resized
            clip = clip.resized(height=1920)
            if clip.w > 1080:
                clip = clip.cropped(x_center=clip.w/2, width=1080)
            
            audio_file = f"{OUTPUT_DIR}/temp/voice_{i}.mp3"
            if generate_audio(voiceovers[i], audio_file):
                audio = AudioFileClip(audio_file)
                # MOVIEPY V2 FIX: set_audio -> with_audio
                clip = clip.with_audio(audio)
            
            text_clip = create_bold_text_clip(
                captions[i],
                size=(1080, 1920),
                duration=clip.duration,
                position='bottom'
            )
            
            final_clip = CompositeVideoClip([clip, text_clip])
            clips.append(final_clip)
        except Exception as e:
            print(f"Error processing clip {i}: {e}")
            continue
    
    if not clips:
        raise ValueError("No clips were successfully processed")
    
    base = concatenate_videoclips(clips, method="compose")
    
    cta_audio_file = f"{OUTPUT_DIR}/temp/voice_cta.mp3"
    if generate_audio(cta, cta_audio_file):
        cta_clip = create_bold_text_clip(
            cta,
            size=(1080, 1920),
            duration=3,
            position='center'
        )
        
        gradient_bg = ImageClip(
            np.tile(np.linspace(50, 150, 1920).reshape(1920, 1, 1), (1, 1080, 3)).astype('uint8')
        ).with_duration(3) # MOVIEPY V2 FIX
        
        cta_composite = CompositeVideoClip([gradient_bg, cta_clip])
        cta_audio = AudioFileClip(cta_audio_file)
        cta_composite = cta_composite.with_audio(cta_audio) # MOVIEPY V2 FIX
        
        final = concatenate_videoclips([base, cta_composite])
    else:
        final = base
    
    final.write_videofile(
        output,
        fps=30,
        codec="libx264",
        audio_codec="aac",
        logger=None
    )
    
    # Cleanup
    for clip in clips: clip.close()
    final.close()

def generate_video(brand_type: str) -> dict:
    """Main function to generate a marketing video"""
    try:
        print("🎬 Generating AI marketing plan...")
        plan = generate_marketing_plan(brand_type)

        video_files = []

        print("📥 Downloading videos from Pexels...")
        for i, term in enumerate(plan["search_terms"]):
            print(f"  Searching for: {term}")
            videos = fetch_pexels_videos(term, count=3)

            if not videos:
                print(f"  ⚠️  No videos found for '{term}', skipping...")
                continue

            filename = f"{OUTPUT_DIR}/temp/clip_{i}.mp4"
            if download_video(videos[0]["url"], filename):
                video_files.append(filename)
                print(f"  ✓ Downloaded clip {i+1}")

        if not video_files:
            print("No video files downloaded. Using fallback search terms.")
            fallback_terms = ["fashion", "clothing", "sale", "style", "trendy"]
            for i, term in enumerate(fallback_terms):
                print(f"  Fallback searching for: {term}")
                videos = fetch_pexels_videos(term, count=3)
                if not videos:
                    print(f"  ⚠️  No fallback videos found for '{term}', skipping...")
                    continue
                filename = f"{OUTPUT_DIR}/temp/fallback_clip_{i}.mp4"
                if download_video(videos[0]["url"], filename):
                    video_files.append(filename)
                    print(f"  ✓ Downloaded fallback clip {i+1}")

        if not video_files:
            return {
                "status": "error",
                "message": "Failed to download any video clips from both generated and fallback search terms."
            }

        print(f"🎥 Building marketing video with {len(video_files)} clips...")

        timestamp = int(__import__('time').time())
        output_path = f"{OUTPUT_DIR}/video_{timestamp}.mp4"

        build_marketing_video(
            video_files=video_files,
            captions=plan["captions"][:len(video_files)],
            voiceovers=plan["voiceover"][:len(video_files)],
            cta=plan["cta"],
            output=output_path
        )

        print(f"✅ Video created successfully!")

        return {
            "status": "success",
            "video_path": output_path,
            "duration": len(video_files) * 4 + 3,
            "plan": plan
        }
    except Exception as e:
        print(f"Error generating video: {e}")
        import traceback
        traceback.print_exc()
        return {
            "status": "error",
            "message": str(e)
        }

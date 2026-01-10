import os
import json
import requests
import numpy as np
import pyttsx3
from groq import Groq
from dotenv import load_dotenv
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from moviepy.editor import (VideoFileClip, ImageClip, CompositeVideoClip, 
                            concatenate_videoclips, AudioFileClip)

load_dotenv()

PEXELS_KEY = os.getenv("PEXELS_API_KEY")
GROQ_KEY = os.getenv("GROQ_API_KEY")

client = Groq(api_key=GROQ_KEY)

# Create output directory
OUTPUT_DIR = "backend/marketing_videos"
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/temp", exist_ok=True)


def generate_marketing_plan(brand_type):
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
- Search terms should be visually dynamic (fashion, models, lifestyle, shopping)
- Tone: promotional, trendy, urgent
- Optimized for Instagram Reels/TikTok
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    return json.loads(response.choices[0].message.content)


def fetch_pexels_videos(query, count=3):
    """Fetch multiple videos to choose the best one"""
    url = "https://api.pexels.com/videos/search"
    headers = {"Authorization": PEXELS_KEY}
    params = {
        "query": query, 
        "per_page": count,
        "orientation": "portrait"  # Better for social media
    }

    res = requests.get(url, headers=headers, params=params).json()

    videos = []
    for v in res.get("videos", []):
        # Get HD quality
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
    r = requests.get(url, stream=True)
    with open(filename, "wb") as f:
        for chunk in r.iter_content(chunk_size=8192):
            f.write(chunk)


def generate_audio(text, filename):
    """Generate TTS audio using pyttsx3"""
    engine = pyttsx3.init()
    
    # Configure voice properties
    engine.setProperty('rate', 160)  # Speed
    engine.setProperty('volume', 1.0)  # Volume
    
    # Try to set a better voice (female voice often available)
    voices = engine.getProperty('voices')
    if len(voices) > 1:
        engine.setProperty('voice', voices[1].id)
    
    engine.save_to_file(text, filename)
    engine.runAndWait()


def create_bold_text_clip(text, size, duration, position='bottom'):
    """Create bold, outlined text with background"""
    width, height = size
    
    # Create image with transparent background
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Try to load a bold font
    try:
        font = ImageFont.truetype("arialbd.ttf", 90)  # Arial Bold
    except:
        try:
            font = ImageFont.truetype("arial.ttf", 90)
        except:
            font = ImageFont.load_default()
    
    # Get text size
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center horizontally, position vertically based on parameter
    x = (width - text_width) // 2
    if position == 'bottom':
        y = height - text_height - 100
    elif position == 'center':
        y = (height - text_height) // 2
    else:  # top
        y = 100
    
    # Draw background rectangle with rounded corners
    padding = 30
    bg_bbox = [
        x - padding,
        y - padding,
        x + text_width + padding,
        y + text_height + padding
    ]
    
    # Semi-transparent black background
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.rounded_rectangle(bg_bbox, radius=20, fill=(0, 0, 0, 180))
    img = Image.alpha_composite(img, overlay)
    
    draw = ImageDraw.Draw(img)
    
    # Draw text outline (black)
    outline_width = 4
    for adj_x in range(-outline_width, outline_width + 1):
        for adj_y in range(-outline_width, outline_width + 1):
            draw.text((x + adj_x, y + adj_y), text, font=font, fill=(0, 0, 0, 255))
    
    # Draw main text (white)
    draw.text((x, y), text, font=font, fill=(255, 255, 255, 255))
    
    return ImageClip(np.array(img)).set_duration(duration).set_opacity(0.95)


def build_marketing_video(video_files, captions, voiceovers, cta, output):
    """Build the final marketing video with better editing"""
    clips = []
    audio_clips = []
    
    for i, file in enumerate(video_files):
        # Load video
        clip = VideoFileClip(file)
        
        # Use middle section of video (usually more stable and interesting)
        clip_duration = min(4, clip.duration)
        start_time = max(0, (clip.duration - clip_duration) / 2)
        clip = clip.subclip(start_time, start_time + clip_duration)
        
        # Resize to 1080x1920 (9:16 aspect ratio for social media)
        clip = clip.resize(height=1920)
        if clip.w > 1080:
            clip = clip.crop(x_center=clip.w/2, width=1080)
        
        # Add some visual effects - slight zoom for dynamism
        clip = clip.resize(lambda t: 1 + 0.02 * t)
        
        # Generate voiceover audio
        audio_file = f"{OUTPUT_DIR}/temp/voice_{i}.mp3"
        generate_audio(voiceovers[i], audio_file)
        
        # Add audio to clip
        if os.path.exists(audio_file):
            audio = AudioFileClip(audio_file)
            clip = clip.set_audio(audio)
        
        # Create bold caption
        text_clip = create_bold_text_clip(
            captions[i],
            size=(1080, 1920),
            duration=clip.duration,
            position='bottom'
        )
        
        # Composite video with text
        final_clip = CompositeVideoClip([clip, text_clip])
        clips.append(final_clip)
    
    # Concatenate all clips
    base = concatenate_videoclips(clips, method="compose")
    
    # Create CTA screen with voiceover
    cta_audio_file = f"{OUTPUT_DIR}/temp/voice_cta.mp3"
    generate_audio(cta, cta_audio_file)
    
    cta_clip = create_bold_text_clip(
        cta,
        size=(1080, 1920),
        duration=3,
        position='center'
    )
    
    # Add gradient background to CTA
    gradient_bg = ImageClip(
        np.tile(np.linspace(50, 150, 1920).reshape(1920, 1, 1), (1, 1080, 3)).astype('uint8')
    ).set_duration(3)
    
    cta_composite = CompositeVideoClip([gradient_bg, cta_clip])
    
    if os.path.exists(cta_audio_file):
        cta_audio = AudioFileClip(cta_audio_file)
        cta_composite = cta_composite.set_audio(cta_audio)
    
    # Final video
    final = concatenate_videoclips([base, cta_composite])
    
    # Write output
    final.write_videofile(
        output,
        fps=30,
        codec="libx264",
        audio_codec="aac",
        bitrate="8000k",
        preset="medium"
    )
    
    # Cleanup
    for clip in clips:
        clip.close()
    base.close()
    final.close()


if __name__ == "__main__":
    brand_type = "trendy clothing brand with limited-time discounts"

    print("🎬 Generating AI marketing plan...")
    plan = generate_marketing_plan(brand_type)
    
    print("\n📋 Marketing Plan:")
    print(f"Search Terms: {plan['search_terms']}")
    print(f"Captions: {plan['captions']}")
    print(f"CTA: {plan['cta']}")

    video_files = []

    print("\n📥 Downloading videos from Pexels...")
    for i, term in enumerate(plan["search_terms"]):
        print(f"  Searching for: {term}")
        videos = fetch_pexels_videos(term, count=3)
        
        if not videos:
            print(f"  ⚠️  No videos found for '{term}', skipping...")
            continue
        
        # Download the first available video
        filename = f"{OUTPUT_DIR}/temp/clip_{i}.mp4"
        download_video(videos[0]["url"], filename)
        video_files.append(filename)
        print(f"  ✓ Downloaded clip {i+1}")

    print(f"\n🎥 Building marketing video with {len(video_files)} clips...")
    print("🔊 Generating voiceovers...")
    
    output_path = f"{OUTPUT_DIR}/final_marketing_video.mp4"
    build_marketing_video(
        video_files=video_files,
        captions=plan["captions"][:len(video_files)],
        voiceovers=plan["voiceover"][:len(video_files)],
        cta=plan["cta"],
        output=output_path
    )

    print(f"\n✅ Video created successfully!")
    print(f"📁 Saved to: {output_path}")
    print(f"⏱️  Duration: ~{len(video_files) * 4 + 3} seconds")
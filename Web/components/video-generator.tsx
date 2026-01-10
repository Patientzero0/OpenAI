"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

type MarketingPlan = {
  search_terms: string[];
  captions: string[];
  voiceover: string[];
  cta: string;
};

type VideoGenerationResponse = {
  status: string;
  video_path?: string;
  duration?: number;
  plan?: MarketingPlan;
  message?: string;
};
import { Zap, Play, Download, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function VideoGeneratorComponent() {
  const [brandType, setBrandType] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<VideoGenerationResponse | null>(null)
  const [error, setError] = useState("")
  const [status, setStatus] = useState("")

  const handleGenerateVideo = async () => {
    if (!brandType.trim()) {
      setError("Please enter a brand type or business description")
      return
    }

    setIsGenerating(true)
    setError("")
    setStatus("Starting video generation...")

    try {
      setStatus("Generating marketing plan...")
      const response = await fetch("http://localhost:8000/api/generate-marketing-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand_type: brandType }),
      })

      const result: VideoGenerationResponse = await response.json()

      if (result.status === "success") {
        setStatus("Video generated successfully!")
        setGeneratedVideo(result)
        setError("")
      } else {
        setError(result.message || "Failed to generate video")
        setStatus("")
        setGeneratedVideo(null)
      }
    } catch (error) {
      setError("Failed to connect to backend. Ensure the server is running on http://localhost:8000")
      setStatus("")
      console.error("Error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadVideo = async () => {
    if (!generatedVideo?.video_path) return

    try {
      const videoName = generatedVideo.video_path.split("/").pop()
      const response = await fetch(`http://localhost:8000/api/download-video/${videoName}`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = videoName || "video.mp4"
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      setError("Failed to download video")
      console.error("Download error:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>AI Marketing Video Generator</span>
          </CardTitle>
          <CardDescription>
            Generate professional short-form marketing videos powered by AI. Perfect for social media campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brand-type">Brand Type or Business Description</Label>
            <Textarea
              id="brand-type"
              placeholder="e.g., 'Premium clothing brand with limited-time discounts' or 'Tech startup offering SaaS solutions'"
              value={brandType}
              onChange={(e) => setBrandType(e.target.value)}
              className="min-h-20"
            />
          </div>

          <Button
            onClick={handleGenerateVideo}
            disabled={isGenerating || !brandType.trim()}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Generating Video...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Generate Marketing Video
              </>
            )}
          </Button>

          {status && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">{status}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {generatedVideo && generatedVideo.status === "success" && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <span>Video Generated Successfully!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Video Details</Label>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Duration:</span> ~{generatedVideo.duration} seconds
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">File:</span> {generatedVideo.video_path?.split("/").pop()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Marketing Plan</Label>
                <div className="space-y-1 text-xs">
                  <p className="text-gray-700">
                    <span className="font-medium">CTA:</span> {generatedVideo.plan?.cta}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Captions Used</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {generatedVideo.plan?.captions.map((caption: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-xs justify-start">
                    {caption}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={handleDownloadVideo}
              className="w-full"
              size="lg"
              variant="default"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Video
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

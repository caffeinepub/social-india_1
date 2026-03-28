import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function CreatePostPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = () => {
    if (!preview) {
      toast.error("Please select an image");
      return;
    }
    toast.success("Post shared successfully!");
    setPreview(null);
    setCaption("");
  };

  const openFilePicker = () => fileRef.current?.click();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-foreground mb-6">Create Post</h1>

      <div className="bg-card rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        {/* Image upload */}
        {!preview ? (
          <button
            type="button"
            data-ocid="create.dropzone"
            onClick={openFilePicker}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`w-full flex flex-col items-center justify-center gap-4 p-16 border-2 border-dashed cursor-pointer transition-colors ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/60"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-foreground font-medium">
                Drag & drop your photo here
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium">
              <Upload className="w-4 h-4" /> Choose Photo
            </span>
          </button>
        ) : (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-96 object-cover"
            />
            <button
              type="button"
              data-ocid="create.remove.button"
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        {/* Caption */}
        <div className="p-5">
          <Textarea
            data-ocid="create.caption.textarea"
            placeholder="Write a caption... #IncredibleIndia"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="bg-muted border-none resize-none text-sm text-foreground placeholder:text-muted-foreground min-h-[100px]"
          />
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-muted-foreground">
              {caption.length} / 2200
            </p>
            <Button
              data-ocid="create.submit_button"
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Share Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

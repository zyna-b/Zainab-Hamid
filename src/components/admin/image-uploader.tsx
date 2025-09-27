'use client';

import { useEffect, useRef, useState, useTransition, type ChangeEvent } from 'react';
import Image from 'next/image';

import { uploadImageAction } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type ImageUploaderProps = {
  id?: string;
  label?: string;
  description?: string;
  folder: string;
  value?: string;
  onUpload: (url: string) => void;
  className?: string;
};

export function ImageUploader({
  id,
  label = 'Upload image',
  description,
  folder,
  value,
  onUpload,
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [fileName, setFileName] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setFileName(file.name);
    uploadFile(file);
  };

  const handleReset = () => {
    setPreview(undefined);
    setFileName('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onUpload('');
  };

  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    startTransition(async () => {
      const result = await uploadImageAction(formData);
      if (result.success && result.data) {
        const url = result.data.url;
        setPreview(url);
        onUpload(url);
        toast({
          title: 'Image ready',
          description: 'The uploaded image URL has been generated.',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Upload failed',
          description: result.message ?? 'Please try again with a different image.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            ref={inputRef}
            id={id}
            type="file"
            accept="image/*"
            disabled={isPending}
            onChange={handleFileChange}
          />
          <Button type="button" variant="outline" onClick={handleReset} disabled={isPending}>
            Clear
          </Button>
        </div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {fileName && <p className="text-xs text-muted-foreground">Selected: {fileName}</p>}
      </div>

      {preview && (
        <div className="relative h-40 w-full overflow-hidden rounded-md border bg-muted">
          <Image
            src={preview}
            alt="Uploaded image preview"
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className="object-cover"
            priority={false}
          />
        </div>
      )}
    </div>
  );
}

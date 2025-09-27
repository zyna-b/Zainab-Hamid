'use client';

import { useRef, useState, useTransition, type ChangeEvent } from 'react';
import Link from 'next/link';

import { uploadDocumentAction } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface DocumentUploaderProps {
  id?: string;
  label?: string;
  description?: string;
  folder: string;
  value?: string;
  onUpload: (url: string) => void;
  className?: string;
  accept?: string;
}

const DEFAULT_ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export function DocumentUploader({
  id,
  label = 'Upload document',
  description,
  folder,
  value,
  onUpload,
  className,
  accept = DEFAULT_ACCEPT,
}: DocumentUploaderProps) {
  const [fileName, setFileName] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setFileName(file.name);
    uploadFile(file);
  };

  const handleReset = () => {
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
      const result = await uploadDocumentAction(formData);
      if (result.success && result.data) {
        const url = result.data.url;
        onUpload(url);
        toast({
          title: 'Document uploaded',
          description: 'The document is ready to download.',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Upload failed',
          description: result.message ?? 'Please try another document.',
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
            accept={accept}
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

      {value && (
        <p className="text-xs text-muted-foreground">
          Current file:{' '}
          <Link href={value} className="underline underline-offset-2" target="_blank" rel="noreferrer">
            {value}
          </Link>
        </p>
      )}
    </div>
  );
}

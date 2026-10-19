import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

/** Galerie avec visionneuse plein écran (§4.5) — clic sur une miniature,
 * navigation précédent/suivant au clavier et par boutons. */
export function GalleryLightbox({ images, alt }: { images: string[]; alt: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (images.length === 0) return null

  const close = () => setOpenIndex(null)
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length))

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpenIndex(i)}
            className="aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted transition-opacity hover:opacity-80"
          >
            <img src={src} alt={`${alt} — ${i + 1}`} loading="lazy" className="size-full object-cover" />
          </button>
        ))}
      </div>

      <Dialog open={openIndex !== null} onOpenChange={(open) => !open && close()}>
        <DialogContent
          showCloseButton={false}
          className="max-w-5xl border-none bg-transparent p-0 shadow-none"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
          }}
        >
          {openIndex !== null && (
            <div className="relative">
              <img
                src={images[openIndex]}
                alt={`${alt} — ${openIndex + 1}`}
                className="max-h-[80vh] w-full rounded-xl object-contain"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 rounded-full"
                onClick={close}
                aria-label="Fermer"
              >
                <X className="size-4" />
              </Button>
              {images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full"
                    onClick={prev}
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full"
                    onClick={next}
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

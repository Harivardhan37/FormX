import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import {
  FaEnvelope,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

function ShareButton({ uuid, title, show }) {
  const [open, setOpen] = useState(false);
  const url = `${window.location.origin}/form/${uuid}`;
  const encodedText = encodeURIComponent(
    `Check out this form: ${title}\n${url}`
  );

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedText}`,
      "_blank"
    );
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        encodedText
      )}`,
      "_blank"
    );
  };

  const handleTelegramShare = () => {
    const text = encodeURIComponent(`Check out this form: ${title}\n${url}`);
    window.open(`https://t.me/share/url?url=${text}`, "_blank");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this form: ${title}`);
    const body = encodeURIComponent(`Here's the link to the form:\n\n${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to Clipboard");
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <Button className="shadow-2xl cursor-pointer flex gap-2 items-center">
              <Share2 className="h-10 w-10" />
              {!show && <span>Share</span>}
            </Button>
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Share Your Form</DialogTitle>
            <DialogDescription>
              Share this form via social media or email, or copy the link below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <Button
              onClick={handleWhatsAppShare}
              variant="outline"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-6 h-6" />
            </Button>
            <Button
              onClick={handleTwitterShare}
              variant="outline"
              aria-label="Twitter"
            >
              <FaTwitter className="w-6 h-6" />
            </Button>
            <Button
              onClick={handleLinkedInShare}
              variant="outline"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </Button>
            <Button
              onClick={handleTelegramShare}
              variant="outline"
              aria-label="Telegram"
            >
              <FaTelegram className="w-6 h-6" />
            </Button>
            <Button
              onClick={handleEmailShare}
              variant="outline"
              aria-label="Email"
            >
              <FaEnvelope className="w-6 h-6" />
            </Button>
          </div>
          <DialogFooter className="p-0">
            <div className="flex w-full">
              <Input
                value={url}
                readOnly
                className="rounded-none rounded-l-lg border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                onClick={handleCopy}
                className="rounded-none rounded-r-lg"
              >
                Copy
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ShareButton;

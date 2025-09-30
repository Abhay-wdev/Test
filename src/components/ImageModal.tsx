import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, altText }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <img src={imageUrl} alt={altText} className="w-full h-auto object-contain" />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
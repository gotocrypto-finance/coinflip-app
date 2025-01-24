export interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="absolute left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm p-12">
      <div className="max-w-96 max-h-80 bg-gray-100 text-black flex relative w-full h-full rounded-lg p-2">
        {children}
      </div>
    </div>
  );
}

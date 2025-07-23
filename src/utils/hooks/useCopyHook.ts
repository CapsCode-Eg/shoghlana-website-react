import { useCallback } from 'react';
import { toast } from 'sonner';

const useCopyToClipboard = () => {
    const copyToClipboard = useCallback((text: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                toast.success('Copied to clipboard');
            }).catch((err) => {
                toast.error(err?.response?.data?.message,{id:'add-companies'})
            });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                toast.success('Copied to clipboard');
            } catch (err) {
                toast.error('failed copy to clipboard');
                return err;
            }
            document.body.removeChild(textarea);
        }
    }, []);

    return copyToClipboard;
};

export default useCopyToClipboard;

import { useEffect } from 'react';
import axios from 'axios';
import { ExtensionType } from '@app/types';

export const useUpdateCode = (
    extension: ExtensionType,
    setCode: React.Dispatch<React.SetStateAction<string>>,
): void => {
    useEffect(() => {
        const getCode = async () => {
            const response = await axios({
                method: 'get',
                url: `http://localhost:3000/io/read-file/${extension}`,
            });

            setCode(response.data);
        };

        getCode();
    }, [extension]);
};

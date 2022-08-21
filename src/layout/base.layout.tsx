import { LanguageProvider } from '@/i18n/LanguageContext';
// import DirectionProvider from '@/provider/DirectionProvider';
import Modals from '@/components/shared/modals/modals';

interface Props extends AppLocalization {
    children: React.ReactNode;
}

const BaseLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        // <DirectionProvider localization={localization}>
        // <LanguageProvider localization={localization}>
        <>
            {children}
            <Modals />
        </>
        // </LanguageProvider>
        // </DirectionProvider>
    );
};

export default BaseLayout;

import { XiAppShell } from './components/xi/XiAppShell';
import { DfLibraryPage } from './pages/DfLibraryPage';
import { DfUploadPage } from './pages/DfUploadPage';
import { PlaceholderPage } from './pages/PlaceholderPage';

const routeContent = {
  '/library': <DfLibraryPage />,
  '/upload': <DfUploadPage />,
  '/review': (
    <PlaceholderPage
      eyebrow="Template review"
      title="Review field maps before helper artifacts ship."
      description="The review cockpit will validate source, permissions, filled-form detection, and field identity before publication."
      nextStep="DOCUFORGE-REVIEW-01 will add review cockpit structure after upload declaration is stable."
    />
  ),
  '/admin': (
    <PlaceholderPage
      eyebrow="Admin queue"
      title="Moderate source, permissions, and publication risk."
      description="The admin queue will protect the public library from stale, unsafe, private, or unapproved forms."
      nextStep="DOCUFORGE-ADMIN-01 will add queue states after the public library and upload flow are proven."
    />
  ),
};

export function App() {
  const currentPath = window.location.pathname === '/' ? '/library' : window.location.pathname;
  const page = routeContent[currentPath as keyof typeof routeContent] ?? routeContent['/library'];

  return <XiAppShell currentPath={currentPath}>{page}</XiAppShell>;
}

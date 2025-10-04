'use client';

export default function FloatingCTA() {
  const scrollToForm = () => {
    // Try mobile form first, then desktop
    const mobileForm = document.querySelector('#qualifier-form-mobile');
    const desktopForm = document.querySelector('#qualifier-form');
    const form = mobileForm || desktopForm;

    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 lg:hidden z-50">
      <button
        onClick={scrollToForm}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-full font-bold shadow-2xl text-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
      >
        Check If You Qualify Now
      </button>
    </div>
  );
}

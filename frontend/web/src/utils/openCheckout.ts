import { User } from './api/me';

export default function openCheckout(user: User): Promise<void> {
  return new Promise<void>((resolve) => {
    const page = document.getElementById('page') as HTMLDivElement;
    const modal = document.getElementById('modal') as HTMLDivElement;

    function closeModal() {
      page.removeAttribute('aria-hidden');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modal.innerHTML = '';
    }

    modal.innerHTML = /* html */ `
    <div class="p-5 m-5 rounded bg-white max-w-xs">
      <h1 class="font-quicksand text-xl">Choose your subscription</h1>
      <button
        id="modal-button-1"
        class="border rounded border-gray-300 hover:bg-gray-100 w-full px-2 py-0.5 mt-1 text-gray-800 flex justify-between items-center"
      >
        <span>Monthly</span>
        <span class="text-right text-sm text-gray-500">
          $3/mo
          <br>
          Billed every month
        </span>
      </button>
      <button
        id="modal-button-2"
        class="border rounded border-gray-300 hover:bg-gray-100 w-full px-2 py-0.5 my-2 text-gray-800 flex justify-between items-center"
      >
        <span>Annual</span>
        <span class="text-right text-sm text-gray-500">
          $2.5/mo
          <br>
          Billed $30/year
        </span>
      </button>
      <button
        id="modal-button-3"
        class="w-full text-center text-primary-darker underline"
      >
        Cancel
      </button>
    </div>
  `;

    const button1 = document.getElementById('modal-button-1') as HTMLButtonElement;
    button1.addEventListener('click', () => {
      (window as any).Paddle.Checkout.open({
        product: process.env.NEXT_PUBLIC_PADDLE_MONTHLY_PRODUCT_ID,
        email: user.email,
        passthrough: JSON.stringify({ userID: user.id }),
        disableLogout: true,
        marketingConsent: 0,
        loadCallback: closeModal,
        successCallback: resolve,
        closeCallback: resolve,
      });
    });
    const button2 = document.getElementById('modal-button-2') as HTMLButtonElement;
    button2.addEventListener('click', () => {
      (window as any).Paddle.Checkout.open({
        product: process.env.NEXT_PUBLIC_PADDLE_ANNUAL_PRODUCT_ID,
        email: user.email,
        passthrough: JSON.stringify({ userID: user.id }),
        disableLogout: true,
        marketingConsent: 0,
        loadCallback: closeModal,
        successCallback: resolve,
        closeCallback: resolve,
      });
    });
    const button3 = document.getElementById('modal-button-3') as HTMLButtonElement;
    button3.addEventListener('click', () => {
      closeModal();
      resolve();
    });

    modal.classList.add('flex');
    modal.classList.remove('hidden');
    page.setAttribute('aria-hidden', 'true');
  });
}

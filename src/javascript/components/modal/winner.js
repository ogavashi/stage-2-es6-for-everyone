import { showModal } from './modal';
import { createElement } from '../../helpers/domHelper';

export function showWinnerModal(fighter) {
  const title = `${fighter.name} won!`;
  const body = createElement({ tagName: 'H1', className: 'modal-body' });
  body.innerText = `Winner Winner Chicken Dinner. God job, ${fighter.name}!`;
  const modal = {
    title,
    bodyElement: body,
    onClose: () => {
      window.location.reload();
    }
  };
  showModal(modal);
}

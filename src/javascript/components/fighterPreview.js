import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  });

  // todo: show fighter info (image, name, health, etc.)

  if (!fighter) throw new Error('Choose second fighter to continue...');

  const fighterImage = createFighterImage(fighter);
  fighterElement.appendChild(fighterImage);

  const fighterInfo = createElement({
    tagName: 'div',
    className: `fighter-info`
  });

  fighterInfo.innerHTML = `<h1>${fighter.name}</h1
  <div>HP: ${fighter.health}</div>
  <div>Attack: ${fighter.attack}</div>
  <div>Defense: ${fighter.defense}</div>
  `;

  fighterElement.appendChild(fighterInfo);

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes
  });

  return imgElement;
}

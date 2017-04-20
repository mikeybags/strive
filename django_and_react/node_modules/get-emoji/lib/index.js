import emojiObect from './emoji-object';
import emojiList from './all-emoji';

export default function getEmoji(name) {
	const emoji = emojiObect[name];
	if (emoji) {
		return emojiObect[name];
	}
	throw new Error(`emoji with name ${name} does not exist`);
}

export { emojiList };

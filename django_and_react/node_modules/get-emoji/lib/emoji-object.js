import allEmoji from './all-emoji';

export default allEmoji.reduce((emojis, emoji) => {
	emojis[emoji] = require(`./optimized-emoji/${emoji}.png`);
	return emojis;
}, {});
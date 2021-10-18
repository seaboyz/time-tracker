'use strict'

const activityElements = document.querySelectorAll('.activity')

async function init() {
	const data = await fetch('./data.json').then(response => response.json())

	document.querySelectorAll('.user li').forEach(_=>_.addEventListener('click', e => {
		document
			.querySelectorAll('.user li')
			.forEach(_ => _.classList.remove('selected'))

		e.target.classList.add('selected')

		const timeframe = e.target.textContent.toLowerCase()

		data
			.map(_ => ({
				activity: _.title.toLowerCase(),
				..._.timeframes[timeframe],
				timeframe,
			}))
			.forEach(_ => {
				const activity = _.activity.replace(' ', '-')
				const current = _.current
				const previous = _.previous
        let timeframe
				switch (_.timeframe) {
          case 'daily':
            timeframe="Day"
            break;
          case 'monthly':
            timeframe="Month"
            break;
          case 'weekly':
            timeframe="Week"
            break;
        
          default:
            timeframe=""
            break;
        }
				document.querySelector(
					`.${activity} .hours`
				).textContent = `${current}hrs`
				document.querySelector(
					`.${activity} .last`
				).textContent = `Last ${timeframe} - ${previous}hrs`
			})
	}))
}

window.onload = init

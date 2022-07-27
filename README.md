## Deployed application
[Youtube-Search App](https://youtube-search-psi.vercel.app/)

## Features
This mini frontend application includes the following features:
* Search bar to receive user's input
* Display of up to 50 videos once query is submitted
* Dropdown menu with options to order searched videos by relevance(default), date, rating, title, number of views
* Video player to play the video clicked by user
* Pagination displaying up to 10 videos per page

## Installation

1. In the terminal, clone the GitHub repo [youtube-search repo](https://github.com/limagisele/youtube-search.git)

2. Go into the repo directory by running  `cd youtube-search`
3. Run `npm install` to install required dependencies
4. Open the repo in the code editor
5. Rename the file `.env.local.sample` to `.env.local` and open it
6. Add your Rapid API Key into the variable `NEXT_PUBLIC_RAPID_API_KEY`
7. Run `npm run dev`
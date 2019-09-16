## Odd Blog

https://a3-dandaman2.glitch.me/


My application for Assignment 3 is titled "Odd Blog" for a wingding message board. I've always been curious about the symbolic language of wingdings, and was wondering
if the font type could be used for any kind of communication/messaging. Odd Blog is that curiosity come to life, as it's the world's first wingding messae board. Although
the app is meant to be used as a wingdings communication platoforms, any user can use the toggle switch at the top of the site to covert all text (even inputted text) to 
and from wingdings/english. All posts are stored in a SQLite3 database, which is persistent among sessions. 
Odd Blog uses a Google OAuth login system for post posting and reviewing posted messages. (Users can both create new posts, as well as delete their own old posts. )
  (Sample Credentials for Testers): username: a32019Tester@gmail.com | password: giveaplease
In creating this site, I used the bootstrap CSS framework and w3 CSS stylesheets, in addition to adding my own styling in classes to change both the positioning and 
displayed language/font of elements. 
## The five middleware packages I used includes:
 - **body-parser:** For both sending and parsing JSON files as part of GET and POST requests.
 - **session:** For maintaining persistent login within user sessions (maintains even in reload).
 - **passport & OAuth:** For logging in/out of the site using Google's OAuth API.
 - **serve-favicon:** For changing the Favicon on the page tab, as well as maintaining it in the filesystem for browser lookup.
 - **cors:** For making the site CORS accessible. An example of this can be found via the path https://a3-dandaman2.glitch.me/cors-entry, 
         which retrieves a generated JSON file.
 
The main challenge I faced while making this project was the fact that certain browsers (such as FireFox) do not support any symbolistic non-unicode font styles/langues 
in their browser standards. This means that on those browsers all text is displayed as english, with the translator switch only changing the font styling to default. 

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the Google strategy to allow users to log in with their google accounts.
- **Tech Achievement 2**: Implemented a search bar which searches all posts from the database, showing only posts with the matching text.
- **Tech Achievement 3**: Implemented a toggle switch which translates all text (as well as typed text) to either Wingdings or english.
- **Tech Achievement 4**: Added a warning alert to FireFox users specifying that FireFox does not support symbolic, non-unicode characters.
- **Tech Achievement 5**: Manipulated and set custom favicon.
- **Tech Achievement 6**: Allowed resources to be shared via CORS accessibility.

### Design/Evaluation Achievements
- **Design Achievement 1**: Implemented an interface which allowed all text on the page to be translateable. 
- **Design Achievement 2**: Created custom Odd Blog favicon.
- **Design Achievement 3**: Allows users to directly click on post text to view it, clicking anywhere outside the post body to deselect it. 
- **Design Achievement 4**: Page is resizeable withing the browser, showing minimal text and reformatting element's positions. 
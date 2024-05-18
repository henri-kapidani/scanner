# Periodic picture scanner

For this to work you have to open the page from localhost or https (link in the about of the repo).

To try on phone you can only use the https page but you need to allow mixed insecure content on Chrome (since the server will still run on your computer with http) (visit `chrome://flags`, look for `Insecure origins treated as secure`, set it to `Enabled` and insert the host of the server, restart Chrome)

Server saves the pictures in `uploads` folder

1.  ```
    npm install
    ```
1.  ```
    npm start
    ```
1.  visit the homepage from a browser
1.  write the url of the server in the input

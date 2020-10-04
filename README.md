## Installing

After you clone the repo, run `npm install`.

## Environment Variables

Create a new `.env` file with the variables used in `.env.example`.
The only required variables are the Roam username and password and one of the services i.e. Instapaper, Feedbin, etc.

## Running the Script

Run `npm run start {service name}` to run the import. It will begin capturing data from the designated service and then open up a headless Chrome instance using Puppeteer to import the data.

The pages will be created with this layout in Roam:

```
- url::
- date::
- author::
- read:: {{[[TODO]]}}
- tags:: #to-read #{source}
- summary::
    -
- ideas::
    -
- scribbles::
    -
text::
    - {Markdown here}
```

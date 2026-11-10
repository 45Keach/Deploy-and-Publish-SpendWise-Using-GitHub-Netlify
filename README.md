# SpendWise — Personal Finance Dashboard

SpendWise is a responsive personal finance dashboard that helps users understand monthly cash flow, review transactions, and keep everyday spending within category budgets.

## Project Description

The dashboard includes a financial summary, spending breakdown, monthly category budgets, and a searchable transaction history. Users can add income or expense transactions. Transaction data is saved in the browser with local storage, so it remains available in the same browser after refresh.

This is a front-end demonstration project. It does not connect to a bank, process payments, or sync data between devices.

## Technologies Used

- HTML5 — accessible page structure and transaction form
- CSS3 — responsive dashboard layout and visual styling
- Vanilla JavaScript — calculations, filtering, rendering, and form interactions
- Browser Local Storage — persistence of demo transactions
- Git and GitHub — source control and repository hosting
- Netlify — static website hosting and continuous deployment

## GitHub Repository Information

- **Repository:** [Deploy-and-Publish-SpendWise-Using-GitHub-Netlify](https://github.com/45Keach/Deploy-and-Publish-SpendWise-Using-GitHub-Netlify)
- **Owner:** [45Keach](https://github.com/45Keach)
- **Default branch:** `main`
- **Visibility:** Public

## Live Netlify Website URL

**Pending Netlify deployment.** After connecting this GitHub repository to Netlify, replace this line with the actual live URL, for example:

`https://your-spendwise-site-name.netlify.app`

Do not submit the placeholder as the live website address.

## Running the Project Locally

No build tools or package installation are required.

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in a modern browser, or run a local static server (for example, `python -m http.server 8000`) and visit `http://localhost:8000`.

## Deployment Process Summary

1. Organize the static site files in the repository root: `index.html`, `styles.css`, and `app.js`.
2. Push the project to this public GitHub repository.
3. Sign in to Netlify and choose **Add new site → Import an existing project**.
4. Connect GitHub and select `45Keach/Deploy-and-Publish-SpendWise-Using-GitHub-Netlify`.
5. Configure the publish directory as `.`. No build command is needed for this plain HTML/CSS/JavaScript project.
6. Deploy the site, then change the generated Netlify site name to a unique SpendWise-related name in **Site configuration → General → Site details → Change site name**.
7. Copy the resulting `.netlify.app` URL into the Live Netlify Website URL section above.
8. Make a visible change, commit and push it to `main`, then confirm Netlify starts and completes a new production deploy.

## Continuous Deployment Test

After Netlify is connected to the GitHub repository, make a small visible edit (for example, change the dashboard welcome text), commit it to `main`, and push it. In Netlify, open the site's **Deploys** page and confirm a new production deploy is triggered. Refresh the live site and verify that the change appears.

**Verification status:** The source is prepared for this test. Automatic deployment has not yet been verified because a Netlify site has not been connected in this project session.

## Final Testing Checklist

- [ ] Open the live Netlify URL successfully.
- [ ] Confirm the dashboard layout works on desktop and mobile.
- [ ] Confirm styles and JavaScript load without browser console errors.
- [ ] Add an expense and an income transaction.
- [ ] Search and filter the transaction list.
- [ ] Refresh the page and confirm transactions persist in local storage.
- [ ] Confirm budget bars and summary figures update.
- [ ] Push a visible change to GitHub and verify the Netlify production deploy updates.
- [ ] Replace the pending URL above with the actual live Netlify URL.

## Challenges Encountered During Deployment

The main deployment considerations for this project are choosing the correct publish directory for a static site, ensuring asset paths are relative to the repository root, and confirming that browser storage works on the deployed HTTPS domain. Netlify cannot display a live site until the repository is connected and its first deploy succeeds.

Record any additional errors actually encountered during your own deployment here rather than claiming issues that did not occur.

## Lessons Learned

- A static website can be deployed without a build command when its HTML, CSS, and JavaScript files are ready to publish.
- Keeping project assets organized and using relative paths makes deployment more reliable.
- Connecting GitHub to Netlify enables continuous deployment whenever changes are pushed to the configured branch.
- A successful deployment should be followed by functional, responsive, and browser-console testing.
- The final README should document the actual live URL and verified deployment results.

---

*SpendWise is an educational project. All displayed financial figures are sample data and are not financial advice.*

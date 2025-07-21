<div align="left" style="position: relative;">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="right" width="30%" style="margin: -20px 0 0 20px;">
<h1>Aether Ai</h1>
<p align="left">
	<em><code>❯ A Ai Saas Platform build with Next js and payement powered by Stripe</code></em>
</p>
<p align="left">
	<img src="https://img.shields.io/github/license/Rohit-Bhetal/Capstone-project-Ai-Saas?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Rohit-Bhetal/Capstone-project-Ai-Saas?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Rohit-Bhetal/Capstone-project-Ai-Saas?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Rohit-Bhetal/Capstone-project-Ai-Saas?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="left"><!-- default option, no dependency badges. -->
</p>
<p align="left">
	<!-- default option, no dependency badges. -->
</p>
</div>
<br clear="right">

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

<code>❯ A modern AI SaaS platform using Next.js with integrated Stripe recurring payments for seamless subscription management. The platform offers two free agentic AI tools that users can access and interact with out-of-the-box. These agents are designed to assist with different use cases, providing value without upfront cost, while encouraging users to explore premium features through a clean and responsive interface. The system is optimized for scalability, user management, and secure payment handling.</code>

---

##  Features

## 🚀 Features

- **🧠 Free Agentic AI Tools**
  - Includes two pre-configured agentic AI assistants
  - Ready-to-use for common tasks like Nutrition based on Reports and help in reasearch work
  - Accessible to all users without paying

- **⚙️ Built with Next.js**
  - Fast, SEO-friendly React framework
  - Server-side rendering (SSR) and API routes
  - Easily extendable for future features

- **💳 Stripe Recurring Payments**
  - Seamless Stripe integration for subscription-based access
  - Monthly/annual plans with secure checkout flow
  - Webhook support for managing billing events

- **👤 User Authentication**
  - Secure user login and session management
  - Auth-gated access to premium features

- **📱 Responsive UI**
  - Fully responsive design optimized for both desktop and mobile
  - Clean and intuitive user interface with modern styling

- **🔒 Protected Routes & API Security**
  - Role-based access control for free vs. premium users
  - Server-side validation of Stripe subscriptions

- **🧩 Easily Extendable**
  - Modular structure for adding more agents or features
  - Well-organized codebase with scalability in mind


---

##  Project Structure

```sh
└── Capstone-project-Ai-Saas/
    ├── README.md
    ├── __tests__
    │   └── lib
    ├── app
    │   ├── (auth)
    │   ├── (dashboard)
    │   ├── (landing)
    │   ├── api
    │   ├── favicon.ico
    │   ├── globals.css
    │   └── layout.tsx
    ├── components
    │   ├── bot-avatar.tsx
    │   ├── crisp-chat.tsx
    │   ├── crisp-provider.tsx
    │   ├── empty.tsx
    │   ├── free-counter.tsx
    │   ├── heading.tsx
    │   ├── landing-content.tsx
    │   ├── landing-hero.tsx
    │   ├── landing-navbar.tsx
    │   ├── loader.tsx
    │   ├── mobile-sidebar.tsx
    │   ├── modal-provider.tsx
    │   ├── navbar.tsx
    │   ├── pro-modal.tsx
    │   ├── sidebar.tsx
    │   ├── subscription-button.tsx
    │   ├── toaster-provider.tsx
    │   ├── ui
    │   └── user-avatar.tsx
    ├── components.json
    ├── constants.ts
    ├── data
    │   └── dummy.tsx
    ├── hooks
    │   └── use-pro-modal.tsx
    ├── jest.config.js
    ├── jest.setup.js
    ├── lib
    │   ├── api-limit.ts
    │   ├── prismadb.ts
    │   ├── stripe.ts
    │   ├── subscription.ts
    │   └── utils.ts
    ├── middleware.ts
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── prisma
    │   └── schema.prisma
    ├── public
    │   ├── empty.png
    │   ├── icon.svg
    │   ├── next.svg
    │   └── vercel.svg
    ├── tailwind.config.ts
    └── tsconfig.json
```


###  Project Index
<details open>
	<summary><b><code>Aether Ai/</code></b></summary>
		<summary><b>lib</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/lib/api-limit.ts'>api-limit.ts</a></b></td>
				<td><code>❯ Api Limit Counter</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/lib/subscription.ts'>subscription.ts</a></b></td>
				<td><code>❯ Subscription Model Page</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/lib/stripe.ts'>stripe.ts</a></b></td>
				<td><code>❯ Stripe Connection page</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/lib/prismadb.ts'>prismadb.ts</a></b></td>
				<td><code>❯ Prisma Intialization Page</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/lib/utils.ts'>utils.ts</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- prisma Submodule -->
		<summary><b>prisma</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/prisma/schema.prisma'>schema.prisma</a></b></td>
				<td><code>❯ Schema for Prisma ORM</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- components Submodule -->
		<summary><b>components</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/components/free-counter.tsx'>free-counter.tsx</a></b></td>
				<td><code>❯ Free 5 Trial use Modal Counter</code></td>
			</tr>
			<tr>
			<tr>
				<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/components/landing-hero.tsx'>landing-hero.tsx</a></b></td>
				<td><code>❯ The Landing Page ,Beautiful Ui built with Shadcn</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/components/modal-provider.tsx'>modal-provider.tsx</a></b></td>
				<td><code>❯ Modal Provider page for the Modal layout</code></td>
			</tr>
			</table>
		 <!-- hooks Submodule -->
		<summary><b>hooks</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/hooks/use-pro-modal.tsx'>use-pro-modal.tsx</a></b></td>
				<td><code>❯ PRO MODAL hooks for Stripe</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- app Submodule -->
		<summary><b>app</b></summary>
		<blockquote>
				<summary><b>(auth)</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(auth)/layout.tsx'>layout.tsx</a></b></td>
						<td><code>❯ Auth Page Layout </code></td>
					</tr>
					</table>
					<details>
						<summary><b>(routes)</b></summary>
						<blockquote>
							<details>
								<summary><b>sign-in</b></summary>
								<blockquote>
									<details>
										<summary><b>[[...sign-in]]</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(auth)/(routes)/sign-in/[[...sign-in]]/page.tsx'>page.tsx</a></b></td>
												<td><code>❯ Dynamic route for authentication</code></td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>sign-up</b></summary>
								<blockquote>
									<details>
										<summary><b>[[...sign-up]]</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(auth)/(routes)/sign-up/[[...sign-up]]/page.tsx'>page.tsx</a></b></td>
												<td><code>❯ Sign up and SignIn route for Clerk<code></td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>(dashboard)</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/layout.tsx'>layout.tsx</a></b></td>
						<td><code>❯ The main layout of the UI</code></td>
					</tr>
					</table>
					<details>
						<summary><b>(routes)</b></summary>
						<blockquote>
							<details>
								<summary><b>research</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/research/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ Agentic Research Ai page , still managed using streamlit</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>code</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/code/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ Code API route</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/code/constants.ts'>constants.ts</a></b></td>
										<td><code>❯ Code generation API route Constants</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>video</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/video/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ Video generation API route(Still working)</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>image</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/image/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ Image generation API route(Still working)</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/image/constants.ts'>constants.ts</a></b></td>
										<td><code>❯ Image generation API route and its contants intialization(Still working)</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>conversation</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/conversation/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ Conversation Api route for conversation page.</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/conversation/constants.ts'>constants.ts</a></b></td>
										<td><code>❯ Some Constant needed for projects</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>settings</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/settings/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ Setting Route for checking the stripe payement management</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>dashboard</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/dashboard/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ Its the main UI dashboard ,beautifully created using shadcn and responsive UI.</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>music</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/music/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ Music Generation - I'm still working in it</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>health</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/(dashboard)/(routes)/health/page.tsx'>page.tsx</a></b></td>
										<td><code>❯ Free agentic Ai called 'Nutrition Ai', currently done with streamlit and connected./code></td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>api</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/api/AiModelApi.ts'>AiModelApi.ts</a></b></td>
						<td><code>❯ Free Trial Counter Model for Checking the 5 free usage in the free trial mode</code></td>
					</tr>
					</table>
					<details>
						<summary><b>code</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/api/code/route.ts'>route.ts</a></b></td>
								<td><code>❯ Code api route for Code Generation AI based on Gemini Api</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>stripe</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/api/stripe/route.tsx'>route.tsx</a></b></td>
								<td><code>❯ Stripe Route for making the necceasry initialization of stripe</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>image</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/api/image/route.ts'>route.ts</a></b></td>
								<td><code>❯ Image Route for Image generation, Currently Handled by some external website link.Later on it will replaced by the real deal.</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>conversation</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/api/conversation/route.ts'>route.ts</a></b></td>
								<td><code>❯ Conversation Route with Gemini Api</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>webhook</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/master/app/api/webhook/route.ts'>route.ts</a></b></td>
								<td><code>❯ Webhooks file for connecting external api to the main app for stripe</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with Capstone-project-Ai-Saas, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript and Python
- **Package Manager:** Npm


###  Installation

Install Capstone-project-Ai-Saas using one of the following methods:

**Build from source:**

1. Clone the Capstone-project-Ai-Saas repository:
```sh
❯ git clone https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas
```

2. Navigate to the project directory:
```sh
❯ cd Capstone-project-Ai-Saas
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




###  Usage
Run Capstone-project-Ai-Saas using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```


###  Testing
Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```


---
##  Project Roadmap

- [X] **`Task 1`**: <strike>Basic MVP done.</strike>
- [ ] **`Task 2`**: Scale the project.
- [ ] **`Task 3`**: Make it industry level.

---

##  Contributing

- **💬 [Join the Discussions](https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/issues)**: Submit bugs found or log feature requests for the `Capstone-project-Ai-Saas` project.
- **💡 [Submit Pull Requests](https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/Rohit-Bhetal/Capstone-project-Ai-Saas
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/Rohit-Bhetal/Capstone-project-Ai-Saas/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Rohit-Bhetal/Capstone-project-Ai-Saas">
   </a>
</p>
</details>




- List any resources, contributors, inspiration, etc. here.

---

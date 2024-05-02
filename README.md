 <p align="center">
    project_description
    <br />
    <a href="https://github.com/yzasegovia/Buhler_sauceDemo"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#test-plan">Test Plan</a></li>
  </ol>
</details>


## About The Project

This is a Playwright automation test script exercise using Typescript: `github_yzasegovia`, `Buhler_sauceDemo`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This documentation describes the software and configuration used as well as the test plan created for this exercise.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Visual Studio Code (https://code.visualstudio.com/download)

### Installation

1. Download VSCode
2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git](https://github.com/yzasegovia/Buhler_sauceDemo.git
   ```
3. Open VScode and in the Terminal type this commmand. This will install and initialize Playwright extension in VSCode
   ```sh
   npm init playwright@latest
   ```
4. To open the project, in the File menu, select "Open Folder" to find the cloned repository folder.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TEST PLAN -->
## Test Plan
The automated test cases have been grouped in to two:
<br />

A. "userlogin" - This group tests the user login and logout functionalities.
 - Testing standard user valid login
 - Testing invalid login using locked_user credential
 - Testing Logout
   
B. "productcheckout" - This group tests the item selection and checkout functionalities.
 - User add products in basket
 - Calculated total price in checkout
 - User remove products in basket
 - User checkout products

Inclusion to these are the defined class files for these tests:
- user.spec.ts: class for userlogin tests
- cart.spec.ts: clas for productcheckout tests

<p align="right">(<a href="#readme-top">back to top</a>)</p>


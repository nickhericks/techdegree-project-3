# Project 3 - Full Stack JavaScript Techdegree

### Interactive Form
This project uses JavaScript and form validation using regular expressions to enhance an interactive registration form.

***
<img src="https://res.cloudinary.com/dtqevfsxh/image/upload/v1550234182/portfolio/interactive-form-1.png" width="400px"><img src="https://res.cloudinary.com/dtqevfsxh/image/upload/v1550218646/portfolio/screenshot-padding-github.png" width="50px">
<img src="https://res.cloudinary.com/dtqevfsxh/image/upload/v1550234182/portfolio/interactive-form-2.png" width="400px">

## View project
:mag: Live version available at [nickhericks.github.io/techdegree-project-3/](https://nickhericks.github.io/techdegree-project-3/)

## Project objective
To complete this project I built customized conditional behavior and interactivity. Form validation is handled on the client side using JavaScript and regular expressions, with customized error messages for each field. Also, jQuery is used in this project which allowed for a shorter and simplified syntax.

### Techniques and concepts:
- jQuery - For document traversal/manipulation, event handling and animation
- Regular Expressions - For form validation
- Progressive Enhancement - JavaScript added without making the page dependent upon JavaScript.

## Additional features
In addition to completing the basic requirements for this techdegree project, I also built additional features and functionality using JavaScript such as:

- [x] Conditional error messages on some fields
- [x] Real-time error messages on some fields

## Code example
An example of one of the JavaScript functions in this project:
1. The validEmail function  uses a regular expression to test the value of the email field and assigns the result to an emailIsValid variable
2. A switch statement is then used to determine if an error message is shown or hidden.
3. The emailIsValid variable is then returned and later used along with other form field validation functions to determine if the user can submit the form.

```javascript
// Check email value, show appropriate errors and return true if no errors
const validEmail = function() {
  const emailIsValid = /^[^@]+@[^@]+\.[a-z]+$/i.test($($email).val());
  // If name is valid, hide errors, else show errors
  emailIsValid ? (removeError($($email), $emailError)) : (showError($($email), $emailError));
  // Return true if valid
  return emailIsValid;
}
```

## Acknowledgements
This project was built as part of the [Full Stack JavaScript Techdegree](https://join.teamtreehouse.com/techdegree/) offered by [Treehouse](https://teamtreehouse.com) :raised_hands:

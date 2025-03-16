import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <>
      Contact Us

      First Name
      This field is required

      Last Name
      This field is required

      Email Address
      Please enter a valid email address
      This field is required

      Query Type
      General Enquiry
      Support Request
      Please select a query type

      Message
      This field is required

      I consent to being contacted by the team
      To submit this form, please consent to being contacted

      Submit

      Message Sent!
      Thanks for completing the form. We'll be in touch soon!
      
      <div class="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/gustavo-shigueo">Gustavo Shigueo</a>.
      </div>
    </>
  );
};

export default App;

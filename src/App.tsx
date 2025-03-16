import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <>
      <main>
        <h1>Contact Us</h1>

        <form id="form">
          <div class="field">
            <label for="first-name">First Name</label>
            <input id="first-name" name="firstName" type="text" required autocomplete="given-name" />

            <ul class="errors">
              <li><span aria-live="polite">This field is required</span></li>
            </ul>
          </div>

          <div class="field">
            <label for="last-name">Last Name</label>
            <input id="last-name" name="lastName" type="text" required autocomplete="family-name" />

            <ul class="errors">
              <li><span aria-live="polite">This field is required</span></li>
            </ul>
          </div>

          <div class="field full-width">
            <label for="email">Email Address</label>
            <input id="email" name="email" type="email" required autocomplete="email"/>

            <ul class="errors">
              <li><span aria-live="polite">Please enter a valid email address</span></li>
              <li><span aria-live="polite">This field is required</span></li>
            </ul>
          </div>

          <div class="field full-width">
            <fieldset>
              <legend>Query Type</legend>

              <div class="grid">
                <label for="general-enquiry"class="radio-button">
                  <input id="general-enquiry" name="query-type" type="radio" value="general-enquiry" required />
                  General Enquiry
                </label>

                <label for="support-request" class="radio-button">
                  <input id="support-request" name="query-type" type="radio" value="support-request" required />
                  Support Request
                </label>

                <ul class="errors">
                  <li><span aria-live="polite">Please select a query type</span></li>
                </ul>
              </div>
            </fieldset>
          </div>

          <div class="field full-width">
            <label for="message">Message</label>
            <textarea id="message" name="message" required />

            <ul class="errors">
              <li><span aria-live="polite">This field is required</span></li>
            </ul>
          </div>

          <div class="field full-width">
            <label for="consent" class="checkbox">
              <input id="consent" name="consent" type="checkbox" required />
              I consent to being contacted by the team
            </label>
            
            <ul class="errors">
              <li><span aria-live="polite">To submit this form, please consent to being contacted</span></li>
            </ul>
          </div>

          <button type="submit" class="full-width">Submit</button>
        </form>
      </main>

      <output form="form">
        <strong>Message Sent!</strong>
        <p>Thanks for completing the form. We'll be in touch soon!</p>
      </output>
      
      <div class="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/gustavo-shigueo">Gustavo Shigueo</a>.
      </div>
    </>
  );
};

export default App;

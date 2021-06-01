# Frontend Take home

For this take home exercise you're tasked with building a form that normalizes a user's address. This is something that we do frequently, and that we already have an API for which you will be using.

The hope is that this exercise exposes you to some of the technology we use day to day at Updater, and gives you an opportunity to show us how you write and think about code. Because the task is rather wide ranging we ask that you time box your work and spend no more than 4 hours on it.

**Please don't hesitate to ask questions, especially if you're having trouble accessing the API**

## Instructions

You will be implementing [the flow in this figma prototype](https://www.figma.com/proto/OFMkwqLQ4gi5tbEnGF5hUi/FE-Take-Home?node-id=1%3A177&scaling=min-zoom). There's most likely more to do here than can be done in 4 hours. If you'd like, fork the repo and submit a PR with your solution, otherwise feel free to commit directly to this repo.

### Requirements

- [x] Use [Next.js](https://nextjs.org/) to build and bundle the application
- [ ] All 3 pages are fully functional with a minimal required focus on design
  - [x] User can enter an address(/address)
  - [ ] Address will be normalized
  - [ ] User can choose between the address they entered and the normalized address(/choose-address)
  - [ ] The chosen address is shown as a final step(/confirm-address)
- [ ] Provide validation as the user types for the following required form fields
  - [x] `street`
  - [x] `state`
  - [x] `city`
  - [x] `postalCode`
- [ ] Build the address form in a way that enables reuse

### Turning in the assignment

Once you are satisfied with your implementation given the alloted time please email your recruiter with a link to a pr, or the name of the branch your code is on.

---

## The Problem

Updater works with user's addresses all the time. After all addresses are at the core of any move. However when working with addresses in software can be surprisingly complicated.

People talk about and write the same address in many different ways. One person's "45 West Thirteenth Street Apartment A" is another person's "45 W 13th ST Apt. A". Over the phone, or on an envelope both of those are equally clear however over the internet problems arise when software is tasked with using these addresses. In order to prevent confusion and make sure that the same physical address is correctly identified addresses need to be standardized. We refer to the process of standardizing an address as `normalization`.

Normalization is done by our backend using a service that references that USPS' address database to identify and collate addresses. On the frontend we need to take in an address from a user in any number of forms and present them with a normalized address that they can then agree to us using as their address. It's likely you've experienced this when entering your shipping address into an e-commerce site.

### An Address Normalization Flow

To help make sure user's have properly normalized addresses the task is to build a flow for validating, and normalizing a user's address.

The flow consists of 2-3 screens:

- **An address entry form**: The user will then be presented with an address form that will perform standard validation on their address.
  - **A normalized address selection screen**: When the user submits an address if the address can be normalized they will be presented with the choice between the address they entered and the normalized version of their address.
- **A confirmation screen**: After the user has input their address, and potentially chosen between a normalized and unnormalized version of their input, they will be shown this static screen confirming the address they chose.

#### Designs

A mock up and simple prototype has been created by our design team in figma. When building these forms please work off of the provided designs. You'll note the there is some existing code which helps make staying within the design language simpler so please feel free to use it on the pages you create.

**NOTE:** If you create, or log into, a figma account you'll be able to get pixel values as well as download images. This isn't required, however if you prefer to work that way feel free.

- [figma designs](https://www.figma.com/file/OFMkwqLQ4gi5tbEnGF5hUi/FE-Take-Home?node-id=0%3A1)
- [figma prototype](https://www.figma.com/proto/OFMkwqLQ4gi5tbEnGF5hUi/FE-Take-Home?node-id=1%3A177&scaling=min-zoom)

#### Screen Requirements

**Address Form**

The address form has 5 fields: `street`, `apt`, `state`, `zip`, and `city`. The `apt` field is optional, however all others are required. If an input is missing, display an error as show in the design.

Upon successfully submitting the form the address needs to be normalized. This is done using the `normalizedAddress` query. If the query responds with a different address than the user input the should be shown the normalized address selection form.

**Normalized Address Form**

This form allows the user to choose between the address they input and the address the `normalizedAddress` query responded with. As soon as the user clicks on the option they'd like to use they should be taken to the confirmation screen.

This form is only shown if the address the user inputs is different than the address the `normalizedAddress` query responds with. Addresses are different if any piece of the address differs.

**Confirmation Screen**

The confirmation screen is a static screen that displays the address the user input, or chose on the Normalized Address Form.

#### GraphQL Documentation

In order to complete this assignment you'll need to make two different GraphQL calls against our staging API.

Our GraphQL endpoint is `api.staging.updater.com/graphql`.

**`normalizedAddress` Query**

This query is used to normalize an address. It requires you to have `access-token` and `client` tokens which have been provided for you in the assignment document you received in email and below:

**Authentication**

In order to authenticate with the API you need to provide the following headers:

- `access-token`: `mdyZLf5vphENjcdpkZ-VpQ`
- `client`: `tZmRsp7breugP8BBCC3q7A`
- `app`: `mover`

Example Query:

```GraphQL
query normalizeAddress($address: AddressInput!){
  normalizedAddress(input: $address){
    normalizedAddress {
      city
      state
      street
      unit
      postalCode
    }
  }
}
```

```JSON
{
  "address": {
    "street": "19 Union Square West",
    "unit": "12th floor",
    "state": "NY",
    "city": "New York",
    "postalCode": "10001"
  }
}
```

Example Response:

```JSON
{
  "data": {
    "normalizedAddress": {
      "normalizedAddress": {
        "city": "New York",
        "state": "NY",
        "street": "19 Union Sq W",
        "unit": "12",
        "postalCode": "10003"
      }
    }
  }
}
```

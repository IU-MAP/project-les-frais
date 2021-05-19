---
name: User Story
about: Describe the User Story
title: "[US]"
labels: US
assignees: ''

---

**Title :** In a few words, summarize the objective of the US for example _Add a product in the cart_.


**Description :**

**As a** [type of user], **I want** [an action] **so that** [a benefit/a value]<br>

**Priority:** This is the priority in the client's expectations, what is important is that the whole team agrees on the scale, you can also choose the stars, of numbers or follow the scale given below. Update the assignee when the team has made a choice.

Scale proposal, the [MoSCoW method] (https://paper-leaf.com/insights/prioritize-user-stories/)
1. _**Must have:** the first release of this product absolutely requires this feature - it is critical to the success of the product._
2. _**Should Have**: Ideally, the first version of this product has this feature, but it is not absolutely necessary. They can be as important, but not as critical in terms of time, as the "Must Have" ._
3. _**Could have**: The user's story is valuable and desirable, but ultimately not necessary._
4. _**Won't have**: the user's story is considered to be one of the least critical or least useful._


**Estimate:** Specify the effort required to implement the US.
For example, you can choose to evaluate it in man / hour.

**Business rules:**
Specify here the essential business rules for the development of this user-story.

_Here is an example below on an e-commerce site basket:_

`` ``
when I add an element of a product in my
basket.
- if quantity > stock then error "not enough stock available"
- if quantity < stock then we add +1 to the quantity
`` ``

**Acceptance criteria**
Specify all the conditions that the story must meet to be considered complete and complete.

More specifically describe a set of scenarios that will become acceptance tests. Specify the associated data as you see in the example scenarios given below.

**Given** some context <br>
**When** some action is carried out <br>
**Then** a set of observable outcomes should occur <br>

_Here are some examples_ <br>
_**Scenario:**_
`` ``
Since I'm on my shopping cart
And that I have a product of id "1234" in quantity "1"
And that the remaining stock on this product is "0"
When I add "1" quantity to my product
Then my cart will display an error
`` ``

_**Scenario:**_ <br>
`` ``
Since I'm on my shopping cart
And that I have a product of id "1235" in quantity "1" <br>
And that the remaining stock on this product is "10"
When I add "1" quantity of my product
Then my product will have "2" quantities
`` ``

> This text and these examples are inspired by: https://blog.myagilepartner.fr/index.php/2017/03/18/story-a4/

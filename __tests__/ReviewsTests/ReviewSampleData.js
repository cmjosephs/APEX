const reviews = {
  "product": "42366",
  "page": 0,
  "count": 200,
  "results": [
      {
          "review_id": 1135590,
          "rating": 3,
          "summary": "DONT TALK TO ME UNTIL I HAVE HAD COFFEE",
          "recommend": true,
          "response": null,
          "body": "COFFEE COFFEE COFFEE COFFEE COFFEE COFFEE COFFEE COFFEE COFFEE COFFEE COFFEE COFFEE ",
          "date": "2022-02-15T00:00:00.000Z",
          "reviewer_name": "Dan",
          "helpfulness": 27,
          "photos": [
              {
                  "id": 2180017,
                  "url": "https://push2production1337.s3.amazonaws.com/image_number_668.1959138935351"
              }
          ]
      },
      {
          "review_id": 1115410,
          "rating": 5,
          "summary": "This thing is perfect!",
          "recommend": true,
          "response": null,
          "body": "This is going to be a really long body so that it exceeds the 250 character limit in order to make sure that it is as big as a review can possibly be. Now I'll go ahead and start spamming random letters to make sure I'm over the 250 character breakpoint if that's ok with you :) XXXKAJSNDKSJADNAKJDSNSKAJDNAKLDNASLDKNDSALKNDSALKNSDALKASDNLAKSDNLAKSDNAKLSDASLDKNASDKJNASDJNASDONADIOANSDOSDINOADSNASIDOJADSIPKDSAPOASDIOASDJAIDJOADSKOPSDKADOSPDKOPDOKAD\n\nLets go HRLAX48!",
          "date": "2021-12-30T00:00:00.000Z",
          "reviewer_name": "Miles",
          "helpfulness": 9,
          "photos": []
      },
      {
          "review_id": 1094802,
          "rating": 3,
          "summary": "This is a Review",
          "recommend": false,
          "response": null,
          "body": "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy.... It is a dark time for the Rebellion. Although the Death Star has been destroyed, Imperial troops have driven the Rebel forces from their hidden base and pursued them across the galaxy. Evading the dreaded Imperial Starfleet, a group of freedom fighters led by Luke Skywalker has established a new secret base on the remote ice world of Hoth. The evil lord Darth Vader, obsessed with finding young Skywalker, has dispatched thousands of remote probes into the far reaches of space....",
          "date": "2021-11-12T00:00:00.000Z",
          "reviewer_name": "Brett",
          "helpfulness": 6,
          "photos": []
      },
      {
        "review_id": 1135605,
        "rating": 3,
        "summary": "oneTwoThree",
        "recommend": true,
        "response": null,
        "body": "FourFiveSix",
        "date": "2022-02-16T00:00:00.000Z",
        "reviewer_name": "Test",
        "helpfulness": 20,
        "photos": [
            {
                "id": 2180036,
                "url": "https://push2production1337.s3.amazonaws.com/image_number_963.8460584319653"
            },
            {
                "id": 2180037,
                "url": "https://push2production1337.s3.amazonaws.com/image_number_204.5028422824373"
            }
        ]
    },
    ]
}

const reviewMetaData = {
    "product_id": "42366",
    "ratings": {
        "1": "25",
        "2": "13",
        "3": "58",
        "4": "118",
        "5": "66"
    },
    "recommended": {
        "false": "75",
        "true": "205"
    },
    "characteristics": {
        "Fit": {
            "id": 142032,
            "value": "3.4276315789473684"
        },
        "Length": {
            "id": 142033,
            "value": "3.1619718309859155"
        },
        "Comfort": {
            "id": 142034,
            "value": "3.6344827586206897"
        },
        "Quality": {
            "id": 142035,
            "value": "3.2413793103448276"
        }
    }
}

const productDetails = {
    "id": 42366,
    "campus": "hr-lax",
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140.00",
    "created_at": "2021-08-13T14:39:39.968Z",
    "updated_at": "2021-08-13T14:39:39.968Z",
    "features": [
        {
            "feature": "Fabric",
            "value": "Canvas"
        },
        {
            "feature": "Buttons",
            "value": "Brass"
        }
    ]
}

export {
    reviews,
    reviewMetaData,
    productDetails
}

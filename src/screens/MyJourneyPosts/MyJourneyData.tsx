// export interface JourneyData {
//     journeyTitle: string;
//     authorName: string;
//     journeyID: string;
//     intro: string;

// }
// to make certain words bold, use .replace(the word I want to make bold, )
export interface Journey {
    [id : string] : {
        author: {
            journeyTitle: string;
            authorName: string;
            journeyID: string;
            intro: string;
            date: string;
            photoName: string;
        }
        header: {
            heading: string;
        };
        process: {
            step1: string;
            step2: string;
            step3: string;
            step4: string;
        };
        additionalInfo: {
            info1: string;
            info2: string;
            info3: string;
            info4: string;
        };
        challenges: {
            challenge1: string;
            challenge2: string;
            challenge3: string;
        };
        takeaways: {
            takeaway1: string;
            takeaway2: string;
            takeaway3: string;
        };
        resources: {
            resource1: string;
            resource2: string;
        };
        experience: {
            experience1: string;
        };
        additionalGroups: {
            group1: string;
            group2: string;
            group3: string;
        };
        groupInfo: {
            groupInfo1: string;
            groupInfo2: string;
            groupInfo3: string;
        };
        links: {
            link1: string;
            link2: string;
        };
    };

}

export const journeys: Journey = {
    // Neri
    '1' :{
        author: {
            journeyTitle: "Discovering BU: Campus Communities and Organizations",
            authorName: "Neri Ajiatas Arreaga",
            journeyID: "vEJlU8RCqhAgX6gX004t4ckpyfVbyPHy",
            intro: "Class of 2025, Data Science Major",
            date: "Nov 13th 2023",
            photoName: "neri",
        },

        header: {
            heading: "Clubs and organizations offer opportunities to engage with " + 
            "other students and can help you discover interests you may not " +
            "have considered.",
        },
        process: {
            step1: "1. You can visit Terrier Central to learn more about the hundreds of clubs on campus.",
            step2: "2. Get in touch with fellow students in class and see what they may be involved in.",
            step3: "3. Visit Splash that happens at the start of every semester.",
            step4: "",
        },
        additionalInfo: {
            info1: "",
            info2: "",
            info3: "",
            info4: "",
        },
        challenges: {
            challenge1: "• I've felt that the multitude of clubs and organizations can be overwhelming, and there's the discomfort of trying something new without knowing anyone in the group you want to join.", 
            challenge2: "• I've learned that BU groups are very welcoming to all individuals of any background. So don’t feel alone, there will always be someone that wants to talk and help you feel comfortable.",
            challenge3: "",
        },
        takeaways: {
            takeaway1: "You have plenty of time to get involved with a community outside of your classroom. Especially throughout the semester, people are always having events and willing to welcome new members :)",
            takeaway2: "You also never have to stick with the organization if you don’t like it. From personal experience, I’ve found it helpful to try a lot of things and reflect on whether I like or don’t like something.",
            takeaway3: "",
        },
        resources: {
            resource1: " Make sure you click to learn more about Diversity and Inclusion at BU",
            resource2: "Click here to view all BU clubs and organizations",
        },
        experience: {
            experience1: '',
        },
        additionalGroups: {
            group1: "Center for Diversity, Equity, & Inclusion (DEI), Questrom School of Business",
            group2: "The Newbury Center",
            group3: "Howard Thurman Center",
        },
        groupInfo: {
            groupInfo1: "The center provides diversity education, programs, and community building initiatives for all Questrom students, both undergraduate and graduate.",
            groupInfo2: "Supporting and celebrating first-generation undergraduate, graduate, and professional students at BU.",
            groupInfo3: "This is a place where cultural expression in all of its forms is embraced and encouraged.",
        },
        links: {
            link1: '',
            link2: "https://www.bu.edu/sao/get-involved/student-organizations/",
        
        }
    },
    // // Bailey
    // '2' : {
    //     author: {
    //         journeyTitle: "The Most Important Career Lessons I’ve Learned",
    //         authorName: "Bailey Borden",
    //         journeyID: "XlT9K5adSYcud8VOybpKjQL0wHrR5og4",
    //         intro: "BU Alumni Software Engineer @Capital One",
    //         date: "Nov 13th 2023",
    //     },

    //     header: {
    //         heading: "I’ve learned a lot in my career, but these are the most important lessons I’ve learned.",
    //     },
    //     process: {
    //         step1: "1. You can visit Terrier Central to learn more about the hundreds of clubs on campus.",
    //         step2: "2. Get in touch with fellow students in class and see what they may be involved in.",
    //         step3: "3. Visit Splash that happens at the start of every semester.",
    //         step4: "",
    //     },
    //     additionalInfo: {
    //         info1: "",
    //         info2: "",
    //         info3: "",  
    //         info4: "",
    //     },
    //     challenges: {
    //         challenge1: "I've felt that the multitude of clubs and organizations can be overwhelming, and there's the discomfort of trying something new without knowing anyone in the group you want to join.", 
    //         challenge2: "I've learned that BU groups are very welcoming to all individuals of any background. So don’t feel alone, there will always be someone that wants to talk and help you feel comfortable.",
    //         challenge3: "",
    //     },
    //     takeaways: {
    //         takeaway1: "You have plenty of time to get involved with a community outside of your classroom. Especially throughout the semester, people are always having events and willing to welcome new members :)",
    //         takeaway2: "You also never have to stick with the organization if you don’t like it. From personal experience, I’ve found it helpful to try a lot of things and reflect on whether I like or don’t like something.",
    //     },
    //     resources: {
    //         resource1: " Make sure you click to learn more about Diversity and Inclusion at BU",
    //         resource2: "Click here to view all BU clubs and organizations",
    //     },
    //     experience: {
    //         experience1: '',
    //     },
    //     additionalGroups: {
    //         group1: "Center for Diversity, Equity, & Inclusion (DEI), Questrom School of Business",
    //         group2: "The Newbury Center",
    //         group3: "Howard Thurman Center",
    //     },
    //     groupInfo: {
    //         groupInfo1: "The center provides diversity education, programs, and community building initiatives for all Questrom students, both undergraduate and graduate.",
    //         groupInfo2: "Supporting and celebrating first-generation undergraduate, graduate, and professional students at BU.",
    //         groupInfo3: "This is a place where cultural expression in all of its forms is embraced and encouraged.",
    //     },
    //     links: {
    //         link1: '',
    //         link2: "https://www.bu.edu/sao/get-involved/student-organizations/",
        
    //     }
    // },
    // // Nana
    // '3' : {
    //     user : {
    //         journeyTitle: "Voice of a First-Gen Graduate, Entrepreneur, Faculty",
    //         authorName: "Nana Younge",
    //         journeyID: "XlT9K5adSYcud8VOybpKjQL0wHrR5og4",
    //         intro: "Founder of Get Girls Going Program Director at Innovate@BU",},
    //     header: {
    //         heading: "I’ve learned a lot in my career, but these are the most important lessons I’ve learned.",
    //     },
    // },
    // // Julia
    // '4' : {
    //     user : {
    //         journeyTitle: "Everything You Need to Know About On-Campus Jobs",
    //         authorName: "Julia Tran",
    //         journeyID: "0tDW3Y3MSmJsElnvYXKEOc6RT8lwaU1p",
    //         intro: "Class of 2027, Business Administration Major",},
    //     header: {
    //         heading: "I’ve learned a lot in my career, but these are the most important lessons I’ve learned.",
    //     },
    // },
    // Rachel
    '5' : {
        author : {
            journeyTitle: "The Ultimate SNAP Guide: Get $200 Monthly for Groceries",
            authorName: "Rachel Li",
            journeyID: "Q9heA4AhlceX6jxsBgbEezCsZV4mYk6f",
            intro: "Class of 2024, Data Science Major",
            date: "Nov 21st 2023",
            photoName: "rachel",
        },
        header: {
            heading: `If you’re a student working part-time, don’t have a meal plan, and shop for groceries on your own, here’s a resource for you: The Supplemental Nutrition Assistance Program (SNAP) gives people who are eligible around $200 monthly funds to buy food. Navigating this process has been a headache. I spent hours on the phone with customer service, figuring out the right document to submit. Here is a guide to applying for SNAP from my own experience so that you can have a much smoother process.`,
        },
        process: {
            step1: "1. Do a quick check to see if you are eligible for SNAP.",
            step2: "2. File the initial application online.",
            step3: `The documents I submitted as a full-time student were: 
    • Financial aid proof
    • Proof that you don’t have a meal plan on campus
    • Proof of work-study
    • Proof of other work you’re (or have been) participating in`,
            step4: "4. After the initial application, they require a phone interview asking you to verify the information.",
        },
        additionalInfo: {
            info1: "1. Reach out to BU Housing housing@bu.edu to request a signed document",
            info2: `2. You need to be actively participating in the work-study in
            order to be qualified. The number of hours you work doesn't
            matter.`,
            info3: `3. Go to studentlink work portal to see if you can find a
            printable version. If not, reach out to your supervisor.`,
            info4: `4. The document needs to have a specific start and end date.`,
        },
        challenges: {
            challenge1: `• Trying to figure out what kind of document they need and being able to connect with a representative is the most daunting part.`, 
            challenge2: "",
            challenge3: "",
        },
        takeaways: {
            takeaway1: `• Try your best to not miss the scheduled phone call because it’s very hard to connect with a representative when you dial in yourself. The average wait time is around 30 min.`,
            takeaway2: `• Download DTA Connect App, it’s the place where you submit all the verification documents.`,
            takeaway3: `• Keep an eye on your mail. They will email letters to you with your case number (you need this number to sign into your DTA app account)`,
        },
        resources: {
            resource1: `- Here are BU resources related to food:
    • Marsh Chapel hosts a ccommunity dinner on Mondays from 5 p.m. to 6:30 p.m., you do not need to have any religious affiliation to participate.`,
            resource2: "",
        },
        experience: {
            experience1: '',
        },
        additionalGroups: {
            group1: "",
            group2: "",
            group3: "",
        },
        groupInfo: {
            groupInfo1: "",
            groupInfo2: "",
            groupInfo3: "",
        },
        links: {
            link1: '',
            link2: "",
        
        }
    },
    // },
    // // Rachel Featured
    // '6' : {
    //     user : {
    //         journeyTitle:
    //         "Volunteering in Florida Natural Reserve - Alternative Service Break",
    //         authorName: "Rachel Li",
    //         journeyID: "Q9heA4AhlceX6jxsBgbEezCsZV4mYk6f",
    //         intro: "Class of 2024, Data Science Major",},
    //     header: {
    //         heading: "I’ve learned a lot in my career, but these are the most important lessons I’ve learned.",
    //     },
    // },
    // // Shateva
    // '7' : {
    //     user : {
    //         journeyTitle: "I Got To Create My Own 4 Credit CS Course!",
    //         authorName: "Shateva Long",
    //         journeyID: "XlT9K5adSYcud8VOybpKjQL0wHrR5og4",
    //         intro: "BU Alumni Product Manager @Microsoft",},
    //     header: {
    //         heading: "I’ve learned a lot in my career, but these are the most important lessons I’ve learned.",
    //     },
    // },
    // // Shateva Featured
    // '8' : {
    //     user : {
    //         journeyTitle: "A First-Gen's Journey from BU to Microsoft",
    //         authorName: "Shateva Long",
    //         journeyID: "qwrr4XlT9K5adSasdasferqL0wHrR5og4",
    //         intro: "BU Alumni Product Manager @Microsoft",},
    //     header: {
    //         heading: "I’ve learned a lot in my career, but these are the most important lessons I’ve learned.",
    //     },
    // },
}
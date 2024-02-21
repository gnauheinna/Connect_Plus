export interface FeaturedJourney {
    [id : string] : {
        author: {
            journeyTitle: string;
            authorName: string;
            journeyID: string;
            intro: string;
            date: string;
            photoName: string;
        };
        question: {
            q1: string;
            q2: string;
            q3: string;
            q4: string;
        };
        answer: {
            a1: string;
            a2: string;
            a3: string;
            a4: string;
        };
    };
}


export const FeatJourneys: FeaturedJourney = {
    // // Bailey
    '2' : {
        author: {
            journeyTitle: "The Most Important Career Lessons I’ve Learned",
            authorName: "Bailey Borden",
            journeyID: "XlT9K5adSYcud8VOybpKjQL0wHrR5og4",
            intro: "BU Alumni Software Engineer @Capital One",
            date: "Dec 10th 2023",
            photoName: "bailey",
        },
        question: {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
        },
        answer: {
            a1: "",
            a2: "",
            a3: "",  
            a4: "",
        },
    },
    // Nana
    '3' : {
        user : {
            journeyTitle: "Voice of a First-Gen Graduate, Entrepreneur, Faculty",
            authorName: "Nana Younge",
            journeyID: "XlT9K5adSYcud8VOybpKjQL0wHrR5og4",
            intro: "Founder of Get Girls Going Program Director at Innovate@BU",},
        header: {
            heading: "I’ve learned a lot in my career, but these are the most important lessons I’ve learned.",
        },
    },
   
    // Shateva Featured
    '8' : {
        author : {
            journeyTitle: "A First-Gen's Journey from BU to Microsoft",
            authorName: "Shateva Long",
            journeyID: "qwrr4XlT9K5adSasdasferqL0wHrR5og4",
            intro: "BU Alumni Product Manager @Microsoft",
            date: "Nov 6th 2023",
            photoName: "shateva",
        },
        header: {
            heading: "I’ve learned a lot in my career, but these are the most important lessons I’ve learned.",
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
            resource1: "Make sure you click to learn more about Diversity and Inclusion at BU",
            resource2: "Click here to view all BU clubs and organizations",
            resource3: "",
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
            link3: "",
        
        }
    },
}
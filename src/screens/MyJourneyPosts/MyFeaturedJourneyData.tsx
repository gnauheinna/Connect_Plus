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
            q5: string;
            q6: string;
            q7: string;
            q8: string;
        };
    
        answer: {
            a1: string;
            a2: string;
            a3: string;
            a4: string;
            a5: string;
            a6: string;
            a7: string;
            a8: string;
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
            q1: "Q: When did you start to be aware of your first-gen identity?" +
            "What does that mean to you?",
            q2: "Q: What were some of the challenges you encountered during" +
            "your computer science studies, and how did you overcome them?",
            q3: "Q: Could you share more about your career journey?",
            q4: "Q: Can you share your experience in searching for software engineering internships?",
            q5: "Q: Were there particular skills or experiences that helped you" +
            "to navigate the workforce as a young professional?",
            q6: "Q: What factors do you believe contributed most to your success?",
            q7: "Q: How do you think students can benefit from peer-to-peer relationships?",
            q8: "Q: For students who are about to graduate and start their" +
            "early careers, what are the top 3 advice you have for them?"
        },
        answer: {
            a1: "My first-gen identity for me means independence." + 
            "In high school I realized that there were a lot of steps I" +
            "needed to take that other students had laid out in front of them. First-gen identity taught me to actively pursue my" +
            "opportunities though and appreciate the ones I found even more so.",
            a2: " A lot of the curriculum can be extremely difficult but the" +
            "biggest challenge I faced though was the more social aspect of" +
           " going into each of my classes without a support network to" +
            "help push me. Meeting new people can be incredibly terrifying" +
            "but if you can push yourself to make those connections then" +
            "going through a CS course with friends who are understanding" +
            "and willing to help each other when they’re struggling makes" +
            "the experience so much better.",
            a3: " My first full time role was with IBM as a Software Engineer in" +
            "San Jose, which I had interned for the summer before. I" + 
            "transitioned to my full time role during Covid. One year into" + 
            "my role I realized how unhappy I was due to the limited social" +
            "aspect and the nature of the role. That's when I joined" +
            "Capital One in Boston. My transition was a little rough." +
            "It was a new department and we were low on staff at the time" +
            "so I had to learn on the fly.  My organization had awesome people I could lean on for" + 
            "support and helped me keep my head above water until I could support myself and the rest of my team.",
            a4: "Be on the lookout for opportunities to connect with people" +
            "with similar backgrounds or interests, like recruitment events catered for LGBT folks, women in STEM," +
            "video game developer conferences,etc. In person networking events are an amazing way to stand out." +
            "Remember that a lot of recruiters aren’t looking for your technical skills or brainpower doing events," +
            "they already know that the interview process will take care of that."+ 
            "Focus on showing them your enthusiasm and drive instead and  you’ll make a much more lasting impression." +
            " It doesn’t even need to be job related, just find a way to" +
            "steer the conversation to something you’ve been obsessing over" +
            "or a long term passion you’ve always had and they’ll recognize" +
            "that you can bring that energy into the office too.",
            a5: "I fully believe that  the most crucial skill you can refine in any type of career" +
            "is your listening ability. Misunderstandings happen all the time and in a remote or" +
            "hybrid workforce where avenues of communication are limited," +
            "making sure you’re actively processing the information thrown" +
            "at you is critical to prevent major errors and missteps.",
            a6: "It sounds corny but a positive attitude takes you a super long way." +
            "Life gets rough, work gets rough, sometimes your team will" +
            "have a super tight deadline or home life will compound with" +
            "work stress, but trying to keep a positive perspective" +
            "genuinely helps you and the people you work with get through" +
            "those days. You’ll always be remembered and appreciated for bringing" +
           " that light to the people around you, and nothing feels" +
            "better than helping someone else get through a hard day too.",
            a7: "",
            a8: "",
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
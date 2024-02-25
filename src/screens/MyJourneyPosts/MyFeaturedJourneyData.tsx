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
        author : {
            journeyTitle: "Voice of a First-Gen Graduate, Entrepreneur, Faculty",
            authorName: "Nana Younge",
            journeyID: "XlT9K5adSYcud8VOybpKjQL0wHrR5og4",
            intro: "Founder of Get Girls Going Program Director at Innovate@BU",
            date: "Dec 4th 2023",
            photoName: "nana",
        },
        question: {
            q1: "Q: What does first-gen mean to you?",
            q2: "Q: How does your first gen identity make you who you are today?",
            q3: "Q: What factors do you believe contributed most to your success?",
            q4: "Q: What are your top 3 pieces of advice for our students?",
            q5: "",
            q6: "",
            q7: "",
            q8: "",
        },
        answer: {
            a1: "",
            a2: "",
            a3: "",
            a4: "",
            a5: "",
            a6: "",
            a7: "",
            a8: "",
        },
    },
   
    // Shateva Featured
    '8' : {
        author : {
            journeyTitle: "A First-Gen's Journey from BU to Microsoft",
            authorName: "Shateva Long",
            journeyID: "qwrr4XlT9K5adSasdasferqL0wHrR5og4",
            intro: "BU Alumni Product Manager @Microsoft",
            date: "Nov 2nd 2023",
            photoName: "shateva",
        },
        question: {
            q1: "Q: What are the three words for our students to quickly get to know you?",
            q2: "Q: How do you understand your first-gen identity?",
            q3: "Q: ould you share with us your journey to obtaining an internship at Microsoft?",
            q4: "Q: What are your top 3 pieces of advice for our students?",
            q5: "Q: What do you think recruiters at these big companies are looking for in a candidate?",
            q6: "Q: Now as a young professional, what are some responsibilities or challenges you face that never crossed your mind as a student?",
            q7: "Q: For students who are just beginning their college journey, what is one piece of advice would you offer to them?",
            q8: "  Q: What are your top 3 pieces of advice for navigating the professional world, adulting challenges, or life after college?",
        },
        answer: {
            a1: "",
            a2: "",
            a3: "",
            a4: "",
            a5: "",
            a6: "",
            a7: "",
            a8: "",
        },
    },
}
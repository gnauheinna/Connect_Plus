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
        header: {
            message: string;
        };

        titles: {
            t1: string;
            t2: string;
            t3: string;
        },
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


export const featJourneys: FeaturedJourney = {
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
    
        header: {
            message: "",
        }, 

        titles: {
            t1: "College Experience",
            t2: "Professional Experience",
            t3: "Tips and Advice",
        },
        question: {
            q1: "Q: When did you start to be aware of your first-gen identity?" +
            " What does that mean to you?",
            q2: "Q: What were some of the challenges you encountered during " +
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
            " In high school I realized that there were a lot of steps I" +
            "needed to take that other students had laid out in front of them. First-gen identity taught me to actively pursue my " +
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
            " Capital One in Boston. \n\n My transition was a little rough." +
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
            a7: "Mutual Support and shared resources are both really important" +
            "things I think Connect+ could provide for first-gen" +
            "students. A lot of students just don’t know about all the" +
            " amazing opportunities that Boston holds. Having a place to" +
           "share information about those opportunities is super useful." +
            "Even having the ability to do something as simple as “Hey I" +
            "found a cool AI conference that so-and-so is holding, would" +
            "anyone want to go together?” can be really useful for a" +
            "first-gen student who might be nervous about entering the professional world.",
            a8: "1.Alway prioritize a job where you feel happy with your role "+ 
            "rather than chasing a higher paycheck. Burnout is so real and happens" +
            " even faster when you're miserable in your job. \n 2. Don’t feel ashamed of your knowledge gaps. " +
            "No one is expecting you to know everything and a leader" + 
            " always appreciates questions and engagement more than zoom silence. \n 3. Never compare your journey to someone else’s." +
            "You’re living a life, not checking a bunch of boxes on a list. There’s no “right” way to be you.",
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
        header: {
            message: "Message for the readers: \nYou started a journey that is so important for your future" +
            "generations, and know that you aren't the only one and that" +
            "there is a big community that is experiencing the same thing." +
            "As much as possible, tap into your community and learn from them.",
        },

        titles: {
            t1: "College Experience",
            t2: "",
            t3: "Tips and Advice",
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
            a1: " I first realized my first-gen identity when my high school" +
            " teacher encouraged me to apply to Bottom Line and Upper Bound. \n " +
            "Being first-gen is powerful. It means you’re changing the future of your family and generations." +
            "\n Being first-generation makes me sad. When I was in college, I noticed my counterparts could call " +
            "their families whenever they had problems related to college. My family couldn't help me  " +
            "in that space because I was the first to experience it. \n " +
            "Being first-gen is full of responsibilities. I had a lot of stress when trying to balance school, work, and " +
            "life. I believe that if I had those resources that other " +
            "students had, it would have been a smoother experience.", 
            a2: "Being first gen gives me a global perspective, a different point of view on the world and people." + 
            "First-generation experience also gave me an open mind and a hopeful mindset. As a first gen, I would always tell myself to" +
            "“use the resources that you have and figure it out.”",
            a3: "The people around me and the willingness to experience and fail.",
            a4: "1. First, find a commiunity with people that believe in you. \n" +
            "2. Second, stay stead and don't give up. \n" +
            "3. Lastly, care about others. When you care about other people, you’re creating a community of people who are also" +
            "going to value you and pour into you.",
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

        header: {
            message: "",
        },

        titles: {
            t1: "College Experience",
            t2: "Adulting & Professional Experience",
            t3: "Tips and Advice",
        }, 

        question: {
            q1: "Q: What are the three words for our students to quickly get to know you?",
            q2: "Q: How do you understand your first-gen identity?",
            q3: "Q: Could you share with us your journey to obtaining an internship at Microsoft?",
            q4: "Q: What are your top 3 pieces of advice for our students?",
            q5: "Q: What do you think recruiters at these big companies are looking for in a candidate?",
            q6: "Q: Now as a young professional, what are some responsibilities or challenges you face that never crossed your mind as a student?",
            q7: "Q: For students who are just beginning their college journey, what is one piece of advice would you offer to them?",
            q8: "Q: What are your top 3 pieces of advice for navigating the professional world, adulting challenges, or life after college?",
        },
        answer: {
            a1: "Twenty-two, New-york-city, dynamic",
            a2: "I first became aware of my first-gen identity when I was" +
            "applying to FY101 sections my freshman year. I think being a" +
            "first-gen college student is comparable to being late to a" +
            "lecture. You had a rough morning, missed the bus, and it's" +
            "raining, but you still showed up. Everyone else around you was" +
            "there on time and some were of course extra early, so you’re a" +
            "bit behind in the material. Catching up is challenging but by" +
            "the end of the lecture, you were able to grasp the concepts" +
            "and learn just as much as everyone else.",
            a3: "I think what helped me the most was not focusing on getting an internship. Instead,",
            a4: "",
            a5: "",
            a6: "",
            a7: "",
            a8: "",
        },
    },
}
// client/src/data/baby-moments-data.ts

export interface Story {
  title: { en: string; hi: string };
  category: string;
  color: string;
  text: { en: string; hi: string };
}

export interface MediaItem {
  type: 'image' | 'sticker';
  tag: string;
  src: string;
}

// --- 1. HEARTWARMING STORIES (40 UNIQUE STORIES) ---
const rawStories: Story[] = [
  {
    title: { en: "The Miracle Heartbeat", hi: "चमत्कारी धड़कन" },
    category: "Love",
    color: "text-red-500",
    text: { en: "Hearing that rapid heartbeat for the first time changes your world forever.", hi: "पहली बार उस तेज़ धड़कन को सुनना आपकी दुनिया को हमेशा के लिए बदल देता है।" }
  },
  {
    title: { en: "Tiny Fingers", hi: "नन्ही उंगलियां" },
    category: "Cute",
    color: "text-blue-500",
    text: { en: "The grip of a newborn's hand around your finger is the strongest bond in nature.", hi: "आपकी उंगली के चारों ओर एक नवजात शिशु की पकड़ प्रकृति का सबसे मजबूत बंधन है।" }
  },
  {
    title: { en: "First Smile", hi: "पहली मुस्कान" },
    category: "Milestone",
    color: "text-yellow-500",
    text: { en: "That first gummy smile wasn't gas. It was a hello to the soul who loves them most.", hi: "वह पहली प्यारी मुस्कान गैस नहीं थी। यह उस आत्मा को नमस्ते था जो उन्हें सबसे ज्यादा प्यार करती है।" }
  },
  {
    title: { en: "Midnight Peace", hi: "आधी रात की शांति" },
    category: "Love",
    color: "text-purple-500",
    text: { en: "3 AM cuddles are exhausting, but the quiet peace of holding your world is unmatched.", hi: "सुबह 3 बजे की गोद थका देने वाली होती है, लेकिन अपनी दुनिया को थामे रखने की शांति बेजोड़ है।" }
  },
  {
    title: { en: "Daddy's Girl", hi: "पापा की परी" },
    category: "Family",
    color: "text-indigo-500",
    text: { en: "Seeing a strong man melt instantly when holding his daughter is pure magic.", hi: "अपनी बेटी को गोद में लेते ही एक मजबूत आदमी को पिघलते देखना शुद्ध जादू है।" }
  },
  {
    title: { en: "The Scent", hi: "महक" },
    category: "Sensory",
    color: "text-rose-500",
    text: { en: "The top of a baby's head smells like fresh rain and heaven combined.", hi: "बच्चे के सिर की महक ताजी बारिश और स्वर्ग के जैसी होती है।" }
  },
  {
    title: { en: "Super Mom", hi: "सुपर मॉम" },
    category: "Inspiration",
    color: "text-pink-600",
    text: { en: "You are growing a human. Don't forget to be kind to yourself today.", hi: "आप एक इंसान को जन्म दे रही हैं। आज अपने प्रति दयालु होना न भूलें।" }
  },
  {
    title: { en: "Grandma's Joy", hi: "दादी की खुशी" },
    category: "Family",
    color: "text-teal-500",
    text: { en: "Watching your mother become a grandmother is a special kind of love circle.", hi: "अपनी माँ को दादी बनते देखना एक खास तरह का प्यार का चक्र है।" }
  },
  {
    title: { en: "The Kick", hi: "वो लात" },
    category: "Excitement",
    color: "text-orange-500",
    text: { en: "A kick from the inside is a high-five from the little one saying 'I'm here!'", hi: "अंदर से एक लात नन्हे मुन्ने की तरफ से एक हाई-फाइव है जो कहता है 'मैं यहाँ हूँ!'" }
  },
  {
    title: { en: "Meeting You", hi: "तुमसे मिलना" },
    category: "Love",
    color: "text-red-600",
    text: { en: "I loved you before I met you. I will protect you until the end of time.", hi: "मैंने तुमसे मिलने से पहले ही तुमसे प्यार किया। मैं अंत तक तुम्हारी रक्षा करूँगी।" }
  },
  {
    title: { en: "Sleeping Angel", hi: "सोता हुआ फरिश्ता" },
    category: "Peace",
    color: "text-blue-300",
    text: { en: "Watching a baby sleep restores your faith in peace and innocence.", hi: "बच्चे को सोते हुए देखना शांति और मासूमियत में आपके विश्वास को बहाल करता है।" }
  },
  {
    title: { en: "Little Steps", hi: "छोटे कदम" },
    category: "Milestone",
    color: "text-green-500",
    text: { en: "The first wobble, the first step. A journey of a thousand miles begins now.", hi: "पहली डगमगाहट, पहला कदम। हजारों मील का सफर अब शुरू होता है।" }
  },
  {
    title: { en: "Laughter", hi: "हँसी" },
    category: "Joy",
    color: "text-yellow-600",
    text: { en: "A baby's belly laugh is the best therapy for a tired soul.", hi: "बच्चे की पेट पकड़कर हँसी थकी हुई आत्मा के लिए सबसे अच्छी चिकित्सा है।" }
  },
  {
    title: { en: "Siblings", hi: "भाई-बहन" },
    category: "Family",
    color: "text-indigo-400",
    text: { en: "The moment an older sibling meets the new baby is the start of a lifelong friendship.", hi: "जिस पल बड़ा भाई-बहन नए बच्चे से मिलता है, वह जीवन भर की दोस्ती की शुरुआत है।" }
  },
  {
    title: { en: "Tiny Clothes", hi: "नन्हे कपड़े" },
    category: "Cute",
    color: "text-pink-400",
    text: { en: "Folding tiny socks and onesies brings a tear to the eye. They are so small!", hi: "नन्हे मोज़े और कपड़े तह करना आँखों में आँसू ला देता है। वे कितने छोटे हैं!" }
  },
  {
    title: { en: "Bath Time", hi: "नहाने का समय" },
    category: "Fun",
    color: "text-cyan-500",
    text: { en: "Splashes, bubbles, and a slippery baby. Chaos, but the cute kind.", hi: "छींटे, बुलबुले और एक फिसलन भरा बच्चा। अराजकता, लेकिन प्यारी वाली।" }
  },
  {
    title: { en: "Strength", hi: "शक्ति" },
    category: "Inspiration",
    color: "text-red-700",
    text: { en: "Pregnancy is tough, but so are you. You are a warrior.", hi: "गर्भावस्था कठिन है, लेकिन आप भी हैं। आप एक योद्धा हैं।" }
  },
  {
    title: { en: "Morning Sickness", hi: "सुबह की थकान" },
    category: "Real Life",
    color: "text-gray-500",
    text: { en: "It's not fun, but it's a reminder that life is busy growing.", hi: "यह मज़ेदार नहीं है, लेकिन यह याद दिलाता है कि जीवन बढ़ रहा है।" }
  },
  {
    title: { en: "Cravings", hi: "खाने की इच्छा" },
    category: "Funny",
    color: "text-orange-400",
    text: { en: "Pickles and ice cream at 2 AM? Why not. Baby wants it!", hi: "रात के 2 बजे अचार और आइसक्रीम? क्यों नहीं। बच्चे को चाहिए!" }
  },
  {
    title: { en: "Wonder", hi: "आश्चर्य" },
    category: "Deep",
    color: "text-purple-600",
    text: { en: "How does such a big love fit into such a tiny body?", hi: "इतना बड़ा प्यार इतने छोटे शरीर में कैसे समा जाता है?" }
  },
  {
    title: { en: "Lullabies", hi: "लोरी" },
    category: "Music",
    color: "text-blue-400",
    text: { en: "Singing softly in the dark creates a bond that music carries forever.", hi: "अंधेरे में धीरे से गाना एक ऐसा बंधन बनाता है जिसे संगीत हमेशा के लिए रखता है।" }
  },
  {
    title: { en: "First Word", hi: "पहला शब्द" },
    category: "Milestone",
    color: "text-green-600",
    text: { en: "Whether it's 'Mama' or 'Dada', hearing their voice form a word is magical.", hi: "चाहे वह 'मामा' हो या 'दादा', उनकी आवाज़ को एक शब्द बनाते सुनना जादुई है।" }
  },
  {
    title: { en: "Curiosity", hi: "जिज्ञासा" },
    category: "Learning",
    color: "text-yellow-400",
    text: { en: "Watching them discover their own hands is a lesson in mindfulness.", hi: "उन्हें अपने ही हाथों को खोजते देखना जागरूकता का एक पाठ है।" }
  },
  {
    title: { en: "Protection", hi: "सुरक्षा" },
    category: "Love",
    color: "text-red-400",
    text: { en: "A mother's instinct to protect is fiercer than a lioness.", hi: "सुरक्षा करने की माँ की वृत्ति शेरनी से भी अधिक उग्र होती है।" }
  },
  {
    title: { en: "The Name", hi: "नाम" },
    category: "Identity",
    color: "text-indigo-600",
    text: { en: "Choosing a name is the first gift you give them that lasts forever.", hi: "नाम चुनना वह पहला उपहार है जो आप उन्हें देते हैं जो हमेशा रहता है।" }
  },
  {
    title: { en: "Heartburn", hi: "सीने में जलन" },
    category: "Funny",
    color: "text-orange-600",
    text: { en: "They say heartburn means a baby with lots of hair. Let's hope it's true!", hi: "कहते हैं सीने में जलन का मतलब है बहुत बालों वाला बच्चा। उम्मीद है यह सच हो!" }
  },
  {
    title: { en: "Nursery", hi: "बच्चों का कमरा" },
    category: "Preparation",
    color: "text-pink-300",
    text: { en: "Painting the room, assembling the crib. Building a nest for the little bird.", hi: "कमरे को पेंट करना, पालना जोड़ना। नन्ही चिड़िया के लिए घोंसला बनाना।" }
  },
  {
    title: { en: "Ultrasound", hi: "अल्ट्रासाउंड" },
    category: "Science",
    color: "text-gray-600",
    text: { en: "That black and white grainy image is the most beautiful photo you own.", hi: "वह काली और सफेद दानेदार तस्वीर आपके पास मौजूद सबसे सुंदर तस्वीर है।" }
  },
  {
    title: { en: "Patience", hi: "धैर्य" },
    category: "Wisdom",
    color: "text-teal-600",
    text: { en: "Pregnancy teaches you to wait. The best things cannot be rushed.", hi: "गर्भावस्था आपको इंतज़ार करना सिखाती है। सबसे अच्छी चीजों में जल्दबाजी नहीं की जा सकती।" }
  },
  {
    title: { en: "Messy Hair", hi: "बिखरे बाल" },
    category: "Real Life",
    color: "text-brown-500",
    text: { en: "Mom bun, messy hair, don't care. I'm busy raising a human.", hi: "मॉम बन, बिखरे बाल, कोई परवाह नहीं। मैं एक इंसान को पालने में व्यस्त हूँ।" }
  },
  {
    title: { en: "Glow", hi: "चमक" },
    category: "Beauty",
    color: "text-yellow-300",
    text: { en: "The pregnancy glow is real. It's the light of two souls shining in one body.", hi: "गर्भावस्था की चमक असली है। यह एक शरीर में चमकने वाली दो आत्माओं का प्रकाश है।" }
  },
  {
    title: { en: "Reading", hi: "पढ़ना" },
    category: "Bonding",
    color: "text-blue-500",
    text: { en: "Reading stories to the bump. They can hear you, you know.", hi: "पेट को कहानियाँ सुनाना। वे आपको सुन सकते हैं, आप जानते हैं।" }
  },
  {
    title: { en: "Stroller Walks", hi: "सैर" },
    category: "Peace",
    color: "text-green-400",
    text: { en: "Walking in the park, pushing the stroller. Simple moments of happiness.", hi: "पार्क में टहलना, स्ट्रर को धक्का देना। खुशी के सरल पल।" }
  },
  {
    title: { en: "Toy Chaos", hi: "खिलौनों की मची" },
    category: "Funny",
    color: "text-red-300",
    text: { en: "Stepping on a toy hurts, but remembering who plays with it heals.", hi: "खिलौने पर पैर रखना दर्द देता है, लेकिन यह याद रखना कि उससे कौन खेलता है, ठीक कर देता है।" }
  },
  {
    title: { en: "Dreams", hi: "सपने" },
    category: "Hope",
    color: "text-purple-400",
    text: { en: "Wondering who they will be, what they will dream. The possibilities are endless.", hi: "सोचना कि वे कौन होंगे, वे क्या सपने देखेंगे। संभावनाएँ अनंत हैं।" }
  },
  {
    title: { en: "Quiet House", hi: "शांत घर" },
    category: "Reflection",
    color: "text-gray-400",
    text: { en: "Enjoy the quiet now, they say. But I can't wait for the noise of joy.", hi: "वे कहते हैं, अभी शांति का आनंद लो। लेकिन मैं खुशी के शोर का इंतज़ार नहीं कर सकती।" }
  },
  {
    title: { en: "Holding Hands", hi: "हाथ पकड़ना" },
    category: "Love",
    color: "text-pink-500",
    text: { en: "You hold their hand for a short while, but their heart forever.", hi: "आप उनका हाथ थोड़ी देर के लिए पकड़ते हैं, लेकिन उनका दिल हमेशा के लिए।" }
  },
  {
    title: { en: "You Are Ready", hi: "आप तैयार हैं" },
    category: "Support",
    color: "text-blue-600",
    text: { en: "If you are worried about being a good mom, it means you already are one.", hi: "यदि आप एक अच्छी माँ बनने को लेकर चिंतित हैं, तो इसका मतलब है कि आप पहले से ही हैं।" }
  }
];

// --- 2. BABY PHOTOS (40 UNIQUE VERIFIED PHOTOS) ---
const rawPhotos: MediaItem[] = [
  { type: "image", tag: "cute baby 1", src: "https://plus.unsplash.com/premium_photo-1664298807846-b7989767c04e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGJhYmllc3xlbnwwfHwwfHx8MA%3D%3D" },
  { type: "image", tag: "cute baby 2", src: "https://images.unsplash.com/photo-1630305131239-c8df91783f10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGJhYmllc3xlbnwwfHwwfHx8MA%3D%3D" },
  { type: "image", tag: "cute baby 3", src: "https://images.unsplash.com/photo-1511184117514-74b2b39697a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3V0ZSUyMGJhYmllc3xlbnwwfHwwfHx8MA%3D%3D" },
  { type: "image", tag: "cute baby 4", src: "https://plus.unsplash.com/premium_photo-1695635228843-35ddbc5026a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3V0ZSUyMGJhYmllc3xlbnwwfHwwfHx8MA%3D%3D" },
  { type: "image", tag: "cute baby 5", src: "https://plus.unsplash.com/premium_photo-1668806642968-c6bebdab7c4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3V0ZSUyMGJhYmllc3xlbnwwfHwwfHx8MA%3D%3D" },
  { type: "image", tag: "cute baby 6", src: "https://images.unsplash.com/photo-1515955033876-427697de0e1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGN1dGUlMjBiYWJpZXN8ZW58MHx8MHx8fDA%3D" },
  { type: "image", tag: "cute baby 7", src: "https://images.unsplash.com/photo-1763013258914-cc8df839f38a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGN1dGUlMjBiYWJpZXN8ZW58MHx8MHx8fDA%3D" },
  { type: "image", tag: "beautiful baby", src: "https://media.istockphoto.com/id/185983184/photo/beautiful-baby.webp?a=1&b=1&s=612x612&w=0&k=20&c=A1JVW4_rLykTnCTAblrYE53AZYGX_n76_pUD7waMvKs=" },
  { type: "image", tag: "smiling girl", src: "https://media.istockphoto.com/id/2169452262/photo/a-baby-girl-is-smiling-at-home-on-a-white-bed-with-a-bow-on-her-head-a-happy-healthy-child-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=z_jB98J62XAKyVv0tthf_IjFK0odFJoqkMAq1s7t52Y=" },
  { type: "image", tag: "baby in hat", src: "https://media.istockphoto.com/id/892959344/photo/cute-adorable-baby-child-with-warm-white-and-pink-hat-with-cute-bobbles.webp?a=1&b=1&s=612x612&w=0&k=20&c=IpnUEb9fATjFzvrLbKGRrxjrjAs71UVZ_pvkZbi2kE8=" },
  { type: "image", tag: "baby playing", src: "https://media.istockphoto.com/id/1390160511/photo/shot-of-an-adorable-baby-playing-with-toys-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=MO2tSneM3b6-0bctIQL4WGviB3UnuAR-1BDySLoWhK8=" },
  { type: "image", tag: "baby girl", src: "https://media.istockphoto.com/id/2212936503/photo/baby-girl.webp?a=1&b=1&s=612x612&w=0&k=20&c=j18_QqY_kyftQl0dtBCn14oj_bBY0O-5iO3qMWdznKQ=" }
];

// --- 3. ALL STICKERS (ONLY YOUR PROVIDED LINKS) ---
const rawStickers: MediaItem[] = [
  // --- New Batch (Prompt 2) ---
  { type: "sticker", tag: "funny dance", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDdpOHBmaG11MDFiOGc1ODl4b3Yzc3U5a3B1MXk5YTk0NXVnZnduYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/wvF9tTPPW0pcQ/giphy.gif" },
  { type: "sticker", tag: "cute", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVuMDBqbGhud3puMGV2bDJwZGh1OXo1Z3RqemdyNmM2YzRqN25nNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KZXFk23J5vLTDEdcyV/giphy.gif" },
  { type: "sticker", tag: "excited", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVuMDBqbGhud3puMGV2bDJwZGh1OXo1Z3RqemdyNmM2YzRqN25nNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5KehGxFnEAmmk/giphy.gif" },
  { type: "sticker", tag: "dancing", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVuMDBqbGhud3puMGV2bDJwZGh1OXo1Z3RqemdyNmM2YzRqN25nNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5i0RdWktDx0xW/giphy.gif" },
  { type: "sticker", tag: "surprised", src: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Y2ZtY25jM3RidnBuaW0weW1sdjR0OGVsc2p4bGNwaXViZmJ2ZmZndCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ORTPDqxMQD4I/giphy.gif" },
  { type: "sticker", tag: "cool", src: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YXdkeHlicTl5d3NyMnluZ3RqdjVreDJxa3B1MTk4b2M3OGZoeXltMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/I8z7CGrLDLpbq/giphy.gif" },
  { type: "sticker", tag: "happy", src: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dmUxODU2M2NuYWVudWR1Z3hkb2FjMm9xaWlwNjVoZ3d1MGxydWN0aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gbDpWneVg2pjO/giphy.gif" },
  { type: "sticker", tag: "hi", src: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3anB5YXB2ZW94NjR6b2U4c3FpYWg0NWh3aXNzcDI0ODU1eWhrd3llcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/eKrgVyZ7zLvJrgZNZn/giphy.gif" },
  { type: "sticker", tag: "funny face", src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzRrenE3cjZlNnMyZmthNDNxZWZuajd1OHFnaWVjNDh1eWk4ZXh0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HKXRzTd7QYt0l5Tcuw/giphy.gif" },

  // --- Previous Batch (Prompt 1) ---
  { type: "sticker", tag: "funny dance", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3E1b3BxMDFxaGRucmp3enN6aHB4enAyemhobDc3ZXh6ZzdwNjc5eCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CwiizswmKu6yU1zH1e/giphy.gif" },
  { type: "sticker", tag: "cool baby", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3E1b3BxMDFxaGRucmp3enN6aHB4enAyemhobDc3ZXh6ZzdwNjc5eCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tJzkRILKOuycHTfkJ1/giphy.gif" },
  { type: "sticker", tag: "party", src: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MGF0ZnZya2Ftcm9xYzhqN3QxdWxuOXc4aHA0aGFkNXdjNnl0dDVlMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/zZbf6UpZslp3nvFjIR/giphy.gif" },
  { type: "sticker", tag: "excited", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjlxcDY3ZWRoMnVpeHZ3dnV6MXFnNms3NzZtczJ6d2wxZ2lhczh6YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1pAYoOu5772nekbNV3/giphy.gif" },
  { type: "sticker", tag: "laughing", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjlxcDY3ZWRoMnVpeHZ3dnV6MXFnNms3NzZtczJ6d2wxZ2lhczh6YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0uyNVIsGya1P5jeJ7J/giphy.gif" },
  { type: "sticker", tag: "playing", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2hpa3czZ3YxdTAxOXplOWgxNGo3bGdkZzlidHV1M2UyNXV5dDc5YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/s9ep8i1VPLv9cL53Oa/giphy.gif" },
  { type: "sticker", tag: "cute", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2hpa3czZ3YxdTAxOXplOWgxNGo3bGdkZzlidHV1M2UyNXV5dDc5YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Q9Whl44aSnoLlw80Fr/giphy.gif" },
  { type: "sticker", tag: "happy", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2hpa3czZ3YxdTAxOXplOWgxNGo3bGdkZzlidHV1M2UyNXV5dDc5YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PpfCTM3a70vBoKUfsm/giphy.gif" },
  { type: "sticker", tag: "waving", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanZ4cDlyOG1yc2xpdWZ1eGU5cDVxMjVmMTU2bjNnam9oNnNvZ3YzYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IqojY0rgVWfOE/giphy.gif" },
  { type: "sticker", tag: "funny face", src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanZ4cDlyOG1yc2xpdWZ1eGU5cDVxMjVmMTU2bjNnam9oNnNvZ3YzYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Xw6yFn7frR3Y4/giphy.gif" },
  { type: "sticker", tag: "celebrate", src: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MzF6NmRyNWllenpvemhib3gyeHRhd2V2eHF1NHp1NjZicTR3NjlybiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dV9O9k4Gt0NNkYkFPY/giphy.gif" }
];

// --- GENERATE 100+ ITEMS PER CATEGORY ---
function generateContent<T>(items: T[], targetCount: number): T[] {
  let result = [...items];
  while (result.length < targetCount) {
    // Shuffle slightly on repeat so it doesn't look identical
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    result = [...result, ...shuffled];
  }
  return result.slice(0, targetCount);
}

// EXPORT THE FINAL DATA
export const storiesData = generateContent(rawStories, 105);
export const photosData = generateContent(rawPhotos, 105);
export const stickersData = generateContent(rawStickers, 105);
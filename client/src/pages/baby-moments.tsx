import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smile, Search, Sticker, Heart, Star, Sparkles, BookOpen, Image as ImageIcon, Languages, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { storiesData, photosData, stickersData, Story, MediaItem } from "@/data/baby-moments-data";

export default function BabyMomentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [visibleCount, setVisibleCount] = useState(20);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  // Combine all data for the "All" tab
  const allContent = useMemo(() => {
    const storyItems = storiesData.map(s => ({ ...s, type: 'story' as const }));
    return [...storyItems, ...photosData, ...stickersData].map((item, index) => ({ ...item, id: index }));
  }, []);

  // Filter content based on search term and active tab
  const getFilteredContent = (tab: string) => {
    const search = searchTerm.toLowerCase();
    let content = allContent;

    if (tab === 'stories') {
      content = allContent.filter(item => item.type === 'story');
    } else if (tab === 'photos') {
      content = allContent.filter(item => item.type === 'image');
    } else if (tab === 'stickers') {
      content = allContent.filter(item => item.type === 'sticker');
    }

    return content.filter(item => {
      if (item.type === 'story') {
        const story = item as Story & { type: 'story' };
        return story.title[language].toLowerCase().includes(search) ||
               story.text[language].toLowerCase().includes(search) ||
               story.category.toLowerCase().includes(search);
      } else {
        const media = item as MediaItem & { id: number };
        return media.tag.toLowerCase().includes(search);
      }
    });
  };

  const renderContent = (tab: string) => {
    const filteredItems = getFilteredContent(tab);
    const visibleItems = filteredItems.slice(0, visibleCount);

    return (
      <>
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {visibleItems.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              {/* CARD TYPE: STORY */}
              {item.type === 'story' && (
                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-pink-400 bg-white mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold text-gray-800">
                        {(item as Story).title[language]}
                      </CardTitle>
                      <Heart className={`h-4 w-4 ${(item as Story).color}`} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${(item as Story).color}`}>
                      {(item as Story).category}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {(item as Story).text[language]}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* CARD TYPE: IMAGE */}
              {item.type === 'image' && (
                <div className="relative group rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={(item as MediaItem).src}
                    alt={(item as MediaItem).tag}
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium capitalize flex items-center gap-2">
                      <ImageIcon className="h-3 w-3" /> {(item as MediaItem).tag}
                    </p>
                  </div>
                </div>
              )}

              {/* CARD TYPE: STICKER */}
              {item.type === 'sticker' && (
                <div className="flex justify-center items-center p-6 bg-yellow-50/50 rounded-2xl border border-yellow-100 hover:bg-yellow-50 transition-colors cursor-pointer mb-4">
                  <img
                    src={(item as MediaItem).src}
                    alt={(item as MediaItem).tag}
                    className="h-28 w-28 object-contain hover:scale-110 transition-transform drop-shadow-sm"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {visibleItems.length < filteredItems.length && (
          <div className="py-8 text-center">
            <Button onClick={loadMore} variant="outline" className="gap-2 text-pink-600 border-pink-200 hover:bg-pink-50">
              Load More <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* END OF LIST INDICATOR */}
        {visibleItems.length === filteredItems.length && filteredItems.length > 0 && (
          <div className="py-12 text-center text-gray-400">
            <Sparkles className="h-8 w-8 mx-auto mb-2 text-pink-300 animate-pulse" />
            <p>You've reached the end of the list!</p>
          </div>
        )}

        {/* NO RESULTS */}
        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <p>No results found for "{searchTerm}"</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="container max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8 rounded-3xl border border-pink-100/50 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-pink-100 p-4 rounded-full">
              <Smile className="h-8 w-8 text-pink-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Moments & Memories</h1>
              <p className="text-gray-500">A huge collection of stories, photos, and stickers.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* LANGUAGE TOGGLE */}
            <Button
              onClick={toggleLanguage}
              variant="outline"
              className="gap-2 border-pink-200 text-pink-700 hover:bg-pink-50 bg-white h-12"
            >
              <Languages className="h-5 w-5" />
              {language === 'en' ? 'English' : 'हिंदी'}
            </Button>

            {/* SEARCH BAR */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10 h-12 rounded-xl bg-white border-pink-100 focus:border-pink-300 transition-all"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleCount(20); // Reset visible count on search
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TABS FOR CATEGORIES */}
      <Tabs defaultValue="all" className="w-full" onValueChange={() => setVisibleCount(20)}>
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-pink-50/50 p-1 rounded-xl">
          <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-pink-600"><Star className="h-4 w-4 mr-2"/> All</TabsTrigger>
          <TabsTrigger value="stories" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-pink-600"><BookOpen className="h-4 w-4 mr-2"/> Stories</TabsTrigger>
          <TabsTrigger value="photos" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-pink-600"><ImageIcon className="h-4 w-4 mr-2"/> Photos</TabsTrigger>
          <TabsTrigger value="stickers" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-pink-600"><Sticker className="h-4 w-4 mr-2"/> Stickers</TabsTrigger>
        </TabsList>

        {/* CONTENT CONTENT */}
        <TabsContent value="all" className="mt-0">
          {renderContent('all')}
        </TabsContent>
        <TabsContent value="stories" className="mt-0">
          {renderContent('stories')}
        </TabsContent>
        <TabsContent value="photos" className="mt-0">
          {renderContent('photos')}
        </TabsContent>
        <TabsContent value="stickers" className="mt-0">
          {renderContent('stickers')}
        </TabsContent>
      </Tabs>
    </div>
  );
}
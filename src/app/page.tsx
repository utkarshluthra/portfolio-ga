import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import BookSection from '@/components/BookSection';
import Featured from '@/components/Featured';
import Certifications from '@/components/Certifications';
import { getProfile, getPosts } from '@/lib/data';

export default async function Home() {
  const profile = await getProfile();
  const posts = await getPosts();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Profile data not found. Please seed the database.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Hero
        name={profile.name}
        title={profile.title}
        bio={profile.bio}
      />
      <Featured posts={posts} />
      <BookSection />
      <About bio={profile.bio} />
      <Experience experience={profile.experience} />
      <Projects projects={profile.projects} />
      <Certifications certifications={profile.certifications} />
      <Contact socials={profile.socials} />
    </div>
  );
}

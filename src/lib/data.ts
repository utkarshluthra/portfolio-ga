import { prisma } from './prisma';

export async function getProfile() {
    const profile = await prisma.profile.findFirst({
        include: {
            experiences: true,
            projects: true,
            certifications: true,
            skills: true,
            videos: true,
        },
    });

    if (!profile) return null;

    // Parse JSON tags for projects
    const projects = profile.projects.map((p) => ({
        ...p,
        tags: JSON.parse(p.tags),
    }));

    return {
        ...profile,
        socials: {
            linkedin: profile.linkedin || undefined,
            github: profile.github || undefined,
            twitter: profile.twitter || undefined,
            website: profile.website || undefined,
        },
        projects: projects.map(p => ({
            ...p,
            link: p.link || undefined,
            github: p.github || undefined,
        })),
        experience: profile.experiences, // Map 'experiences' (DB) to 'experience' (JSON/Frontend)
        videos: profile.videos,
    };
}

// Helper to handle profile updates
export async function updateProfile(data: any) {
    const profile = await prisma.profile.findFirst();
    if (!profile) throw new Error('Profile not found');

    // Update Profile Fields
    await prisma.profile.update({
        where: { id: profile.id },
        data: {
            name: data.name,
            title: data.title,
            bio: data.bio,
            linkedin: data.socials?.linkedin,
            github: data.socials?.github,
            twitter: data.socials?.twitter,
            website: data.socials?.website,
        },
    });

    // Update Relations (Delete all and recreate for simplicity to match JSON overwrite behavior)
    // Transaction ensures atomicity
    await prisma.$transaction(async (tx) => {
        // Experience
        if (data.experience) {
            await tx.experience.deleteMany({ where: { profileId: profile.id } });
            for (const exp of data.experience) {
                await tx.experience.create({
                    data: {
                        role: exp.role,
                        company: exp.company,
                        period: exp.period,
                        description: exp.description,
                        profileId: profile.id,
                    },
                });
            }
        }

        // Projects
        if (data.projects) {
            await tx.project.deleteMany({ where: { profileId: profile.id } });
            for (const proj of data.projects) {
                await tx.project.create({
                    data: {
                        title: proj.title,
                        description: proj.description,
                        link: proj.link,
                        github: proj.github,
                        tags: JSON.stringify(proj.tags),
                        profileId: profile.id,
                    },
                });
            }
        }

        // Certifications
        if (data.certifications) {
            await tx.certification.deleteMany({ where: { profileId: profile.id } });
            for (const cert of data.certifications) {
                await tx.certification.create({
                    data: {
                        title: cert.title,
                        issuer: cert.issuer,
                        date: cert.date,
                        profileId: profile.id,
                    },
                });
            }
        }

        // Skills
        if (data.skills) {
            await tx.skill.deleteMany({ where: { profileId: profile.id } });
            for (const skill of data.skills) {
                await tx.skill.create({
                    data: {
                        name: skill,
                        profileId: profile.id,
                    },
                });
            }
        }

        // Videos
        if (data.videos) {
            await tx.video.deleteMany({ where: { profileId: profile.id } });
            for (const video of data.videos) {
                await tx.video.create({
                    data: {
                        title: video.title,
                        url: video.url,
                        description: video.description,
                        profileId: profile.id,
                    },
                });
            }
        }
    });

    return getProfile();
}

export async function getPosts() {
    const posts = await prisma.post.findMany({
        orderBy: { date: 'desc' },
    });
    return posts.map(p => ({
        ...p,
        content: JSON.parse(p.content)
    }));
}

export async function getPost(slug: string) {
    const post = await prisma.post.findUnique({
        where: { slug },
    });
    if (!post) return null;
    return {
        ...post,
        content: JSON.parse(post.content)
    };
}

export async function createPost(post: any) {
    const newPost = await prisma.post.create({
        data: {
            title: post.title,
            slug: post.slug,
            date: post.date,
            excerpt: post.excerpt,
            content: JSON.stringify(post.content),
        },
    });
    return { ...newPost, content: JSON.parse(newPost.content) };
}

export async function updatePost(slug: string, data: any) {
    const updatedPost = await prisma.post.update({
        where: { slug },
        data: {
            title: data.title,
            slug: data.slug,
            date: data.date,
            excerpt: data.excerpt,
            content: data.content ? JSON.stringify(data.content) : undefined,
        },
    });
    return { ...updatedPost, content: JSON.parse(updatedPost.content) };
}

export async function deletePost(slug: string) {
    await prisma.post.delete({
        where: { slug },
    });
    return true;
}

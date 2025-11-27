import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient({})

async function main() {
    console.log('Start seeding ...')

    // Read JSON data
    const profileData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/profile.json'), 'utf-8'))
    const postsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/posts.json'), 'utf-8'))

    // Clean DB
    await prisma.skill.deleteMany()
    await prisma.certification.deleteMany()
    await prisma.project.deleteMany()
    await prisma.experience.deleteMany()
    await prisma.profile.deleteMany()
    await prisma.post.deleteMany()

    // Insert Profile
    const profile = await prisma.profile.create({
        data: {
            name: profileData.name,
            title: profileData.title,
            bio: profileData.bio,
            linkedin: profileData.socials.linkedin,
            github: profileData.socials.github,
            twitter: profileData.socials.twitter,
            website: profileData.socials.website,
        }
    })

    // Insert Related Data
    for (const exp of profileData.experience) {
        await prisma.experience.create({
            data: {
                role: exp.role,
                company: exp.company,
                period: exp.period,
                description: exp.description,
                profileId: profile.id
            }
        })
    }

    for (const proj of profileData.projects) {
        await prisma.project.create({
            data: {
                title: proj.title,
                description: proj.description,
                link: proj.link,
                github: proj.github,
                tags: JSON.stringify(proj.tags),
                profileId: profile.id
            }
        })
    }

    for (const cert of profileData.certifications) {
        await prisma.certification.create({
            data: {
                title: cert.title,
                issuer: cert.issuer,
                date: cert.date,
                profileId: profile.id
            }
        })
    }

    for (const skill of profileData.skills) {
        await prisma.skill.create({
            data: {
                name: skill,
                profileId: profile.id
            }
        })
    }

    // Insert Posts
    for (const post of postsData) {
        await prisma.post.create({
            data: {
                title: post.title,
                slug: post.slug,
                date: post.date,
                excerpt: post.excerpt,
                content: JSON.stringify(post.content)
            }
        })
    }

    console.log('Seeding completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

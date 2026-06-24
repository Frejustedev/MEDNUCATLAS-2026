import { z } from 'zod';

export const userProfileSchema = z.enum(['patient', 'medecin_non_nuc', 'medecin_nuc', 'admin']);
export type UserProfileEnum = z.infer<typeof userProfileSchema>;

export const articleModeSchema = z.enum(['patient', 'medecin_non_nuc', 'medecin_nuc']);
export type ArticleModeEnum = z.infer<typeof articleModeSchema>;

export const difficultySchema = z.enum(['fondamental', 'intermédiaire', 'avancé']);

export const infoBoxSchema = z.object({
  type: z.enum(['info', 'warning', 'tip']),
  title: z.string().min(1).max(200),
  text: z.string().min(1).max(5000),
});

export const sectionListSchema = z
  .union([
    z.array(z.string().max(2000)),
    z.object({
      title: z.string().max(200).optional(),
      items: z.array(z.string().max(2000)),
    }),
  ])
  .optional();

export const sectionSchema = z.object({
  title: z.string().min(1).max(200),
  text: z.string().max(20000).optional(),
  list: sectionListSchema,
  figure: z
    .object({
      svg: z.string().max(40000).optional(),
      imageUrl: z.string().url().max(1000).optional(),
      alt: z.string().min(1).max(500),
      caption: z.string().max(500).optional(),
    })
    .optional(),
  infoBox: infoBoxSchema.optional(),
  infoBoxes: z.array(infoBoxSchema).max(6).optional(),
  stats: z
    .array(
      z.object({
        value: z.string().max(50),
        label: z.string().max(200),
      })
    )
    .max(12)
    .optional(),
  steps: z
    .array(
      z.object({
        title: z.string().min(1).max(200),
        text: z.string().min(1).max(2000),
      })
    )
    .max(20)
    .optional(),
});

export const contentModeSchema = z.object({
  sections: z.array(sectionSchema).max(50),
  table: z
    .object({
      headers: z.array(z.string().max(200)).max(20),
      rows: z.array(z.array(z.string().max(1000)).max(20)).max(200),
    })
    .optional(),
});

export const identityFieldSchema = z.object({
  label: z.string().min(1).max(80),
  value: z.string().min(1).max(300),
  icon: z.string().max(30).optional(),
});

export const relatedLinkSchema = z.object({
  type: z.enum(['traceur', 'maladie', 'examen', 'score', 'theranostique']),
  label: z.string().min(1).max(120),
  href: z.string().max(500).optional(),
});

export const quizQuestionSchema = z.object({
  question: z.string().min(3).max(500),
  options: z.array(z.string().min(1).max(300)).min(2).max(6),
  answer: z.number().int().min(0).max(5),
  explanation: z.string().max(1000).optional(),
  difficulty: z.enum(['facile', 'moyen', 'difficile']).optional(),
});

export const revisionSheetSchema = z.object({
  keyPoints: z.array(z.string().max(400)).max(20).optional(),
  protocol: z.array(z.string().max(400)).max(20).optional(),
  scores: z.array(z.string().max(400)).max(20).optional(),
  pitfalls: z.array(z.string().max(400)).max(20).optional(),
});

export const articleContentSchema = z.object({
  lead: z.string().max(5000),
  patient: contentModeSchema,
  medecin_non_nuc: contentModeSchema,
  medecin_nuc: contentModeSchema,
  identityCard: z.array(identityFieldSchema).max(20).optional(),
  relatedLinks: z.array(relatedLinkSchema).max(40).optional(),
  quiz: z.array(quizQuestionSchema).max(40).optional(),
  revisionSheet: revisionSheetSchema.optional(),
});

export const articleSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[A-Za-z0-9_-]+$/, 'ID alphanumérique uniquement (- _ autorisés)'),
  cat: z.string().min(1).max(50),
  catLabel: z.string().max(100).optional(),
  title: z.string().min(3).max(200),
  tags: z.array(z.string().max(50)).max(50).optional().default([]),
  difficulty: difficultySchema.optional().default('fondamental'),
  excerpt: z.string().max(1000).optional().default(''),
  targetAudience: z.array(articleModeSchema).max(3).optional(),
  authors: z.array(z.string().max(200)).max(50).optional(),
  sources: z
    .array(
      z.object({
        title: z.string().min(1).max(500),
        url: z.string().url().max(1000).optional().or(z.literal('')),
      })
    )
    .max(100)
    .optional(),
  content: articleContentSchema,
  reviewStatus: z.enum(['draft', 'ai_assisted', 'reviewed']).optional(),
  reviewedBy: z.string().max(200).optional(),
  reviewedAt: z.string().max(50).optional(),
});

export type ArticleInput = z.infer<typeof articleSchema>;

export const articleImportSchema = articleSchema.partial({ id: true, cat: true, catLabel: true });

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Nom trop court').max(150),
  email: z.string().email('Email invalide').max(200),
  subject: z.string().min(3).max(200),
  message: z.string().min(10, 'Message trop court (10 caractères min)').max(5000),
  honeypot: z.string().max(0).optional(),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const directoryEntrySchema = z.object({
  type: z.enum(['center', 'doctor']),
  name: z.string().min(2).max(300),
  country: z.string().min(2).max(100),
  city: z.string().min(2).max(150),
  address: z.string().max(500).optional(),
  phone: z.string().max(50).optional(),
  email: z.string().email().max(200).optional().or(z.literal('')),
  website: z.string().url().max(1000).optional().or(z.literal('')),
  description: z.string().max(2000).optional(),
  equipment: z.array(z.string().max(150)).max(30).optional(),
});

export type DirectoryEntryInput = z.infer<typeof directoryEntrySchema>;

export const aiGenerateRequestSchema = z.object({
  topic: z.string().min(5, 'Sujet trop court').max(500),
  categoryHint: z.string().max(50).optional(),
});

export const aiChatRequestSchema = z.object({
  articleId: z.string().min(1).max(100),
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(8000),
      })
    )
    .max(20)
    .optional()
    .default([]),
  userProfile: articleModeSchema,
});

export type AiChatRequest = z.infer<typeof aiChatRequestSchema>;
export type AiGenerateRequest = z.infer<typeof aiGenerateRequestSchema>;

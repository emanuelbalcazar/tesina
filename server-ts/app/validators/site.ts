import vine from '@vinejs/vine'

/**
 * Validates the site's creation action
 */
export const createSiteValidator = vine.compile(
    vine.object({
        site: vine.string().trim().minLength(6),
    })
)

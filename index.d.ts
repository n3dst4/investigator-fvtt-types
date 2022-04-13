import { CSSObject, SerializedStyles, css } from "@emotion/react";

/**
 * A theme definition for INVESTIGATOR
 */
export type ThemeSeedV1 = {
  schemaVersion: "v1",
  /** The name of the theme. Use puns and allusions liberally. */
  displayName: string,
  /**
   * CSS block which will be inserted at the top of the browser document. This
   * is a good place for `@import` directives for loading fonts, e.g.
   * 
   * ```
   * global: css`
      import url('https://fonts.googleapis.com/css2?family=Patrick+Hand+SC&display=swap');
    `,
   * ```
   *
   * (That `import` should have an @-sign in front of it but it messes with the 
   * comment syntax.)
   */
  global?: SerializedStyles | string,
  /**
   * Will be applied to the root element of the themed area. This is a good
   * place to apply a wallpaper image. It is assumed that any window using this
   * style will always layer `backgroundPrimary` or `backgroundSecondary` over
   * it before adding text.
   */
  largeSheetRootStyle: CSSObject,
  /**
   * Will be applied to the root element of the themed area. This is a good
   * place to apply a wallpaper image. Unlike `largeSheetRootStyle`, text might
   * be applied directly onto this background. This is a good place to adjust
   * the background to make it directly usable.
   * @default largeSheetRootStyle
   */
  smallSheetRootStyle?: CSSObject,
  /**
   * If defined, these styles will be added to the app window for any <CSSReset>
   * unless `noStyleAppWindow` is given.
   */
  appWindowStyle?: CSSObject,
  /**
   * Font string for block text.
   */
  bodyFont?: string,
  /**
   * Font string for title or label text.
   */
  displayFont?: string,
  /**
   * Styles for the fancy character sheet logo. See the LogoEditable component
   * for details.
   */
  logo: {
    /**
     * This number is used when working out how to scale the lettering in the
     * character sheet logo. The default is 14,
     * @default 14
     */
    fontScaleFactor?: number,
    /**
     * These styles will be applied to the front text element, so you can do the
     * `background-clip: text; color: transparent;` trick to get gradient (or
     * other image) text.
     */
    frontTextElementStyle: CSSObject,
    /**
     * These styles will be applied to the rear text element. This is a good
     * place to add drop shadows because if you put them on the front element
     * while doing the `background-clip: text; color: transparent;` trick the
     * shadow will show through the text 🥺
     */
    rearTextElementStyle: CSSObject,
    /**
     * These styles will be applied to both text elements at once (actually to a
     * wrapper around them. This is a good place to apply `transform`s.
     */
    textElementsStyle: CSSObject,
    /**
     * These styles will be applied to the otherwise-empty div that goes behind
     * the text elements.
     */
    backdropStyle: CSSObject,
  },

  /**
   * All the values in this collection should be parseable as CSS colors
   */
  colors: {
    /**
     * callout color for clickable text and other "hot" items
     */
    accent: string,
    /**
     * when `accent is used as a background, this color should work as text over
     * it
     */
    accentContrast: string,
    /**
     * used for hover effect on hot items
     */
    glow: string,
    /**
     * tinting color used to indicate danger. Should be given as a bold, opaque
     * color, but will be blended in use.
     * @default red
     */
    danger?: string,
    /**
     * flat color to stand in as the background before images have loaded
     */
    wallpaper: string,
    /**
     * basic non-interactive text color
     */
    text: string,
    /**
     * background for buttons
     */
    backgroundButton: string,
    /**
     * The contract for this color is: if you layer this color over the
     * `rootElementStyle` or the `wallpaper` color, you will get a surface which
     * can be used for text in either the `text` or `accent` colors.
     */
    backgroundPrimary: string,

    /**
     * The contract for this color is
     * 1. the same as backgroundPrimary but should look less prominent (will be
     * used for inactive tabs)
     * 2. can also be layered *on top of* backgroundPrimary to create a
     * secondary panel
     * @see {@link backgroundPrimary}
     */
    backgroundSecondary: string,

    /**
     * Color used to outline controls
     * @default text
     */
    controlBorder?: string,

  },
}

export type ThemeV1 = ThemeSeedV1 & {
  smallSheetRootStyle: CSSObject,

  colors: ThemeSeedV1["colors"] & {
    bgOpaquePrimary: string,
    bgOpaqueSecondary: string,
    bgTransDangerPrimary: string,
    bgTransDangerSecondary: string,
    bgOpaqueDangerPrimary: string,
    bgOpaqueDangerSecondary: string,
    controlBorder: string,
  },

  logo: ThemeSeedV1["logo"] & {
    fontScaleFactor: number,
  },
}

export interface PresetV1 {
  schemaVersion: "v1",
  /** The name that this preset will appear as in the Foundry UI */
  displayName: string;
  /**
   * The id of the theme to use. If you are registering a custom theme, it
   * should match the id you used.
   */
  defaultTheme: string;
  /**
   * Categories for investigative abilities, e.g. "Academic", "Interpersonal"
   */
  investigativeAbilityCategories: string[];
  /**
   * Categories for general abilities. For many systems, this will just be 
   * "General".
   */
  generalAbilityCategories: string[];
  /**
   * List of ability names that can be used in combat.
   * This may be removed in future in favour or just flagging abilities as
   * "combat usable".
   */
  combatAbilities: string[];
  /**
   * What do we call the main, short descriptive text for a PC in this system?
   */
  occupationLabel: string;
  /**
   * What short text fields do we need?
   */
  shortNotes: string[];
  /**
   * What groups of notes to we need per character?
   */
  longNotes: string[];
  /**
   * What compendium packs should be automatically added to new PCs
   */
  newPCPacks: string[];
  /**
   * What compendium packs should be automatically added to new NPCs
   */
  newNPCPacks: string[];
  /**
   * Can abilities be boosted in this system?
   */
  useBoost: boolean;
  /**
   * Ignore this unless you are doing something based on the DERPG  system.
   */
  useMwStyleAbilities: boolean;
  /**
   * Ignore this unless you are doing something based on the DERPG  system.
   */
  mwHiddenShortNotes?: string[];
  /**
   * Ignore this unless you are doing something based on the DERPG  system.
   */
  mwUseAlternativeItemTypes: boolean;
}

/**
 * Type for the global CONFIG.Investigator
 */
interface InvestigatorConfig {
  /**
   * Install a theme.
   */
  installTheme: (id: string, seed: ThemeSeedV1) => void,
  /**
   * Install a preset.
   */
  installPreset: (id: string, preset: PresetV1) => void,
};



declare global {
  // we redeclare CONFIG in global scope to add our bit. thanks to TS
  // declaration merging, this is added to the main type.
  interface CONFIG {
    Investigator?: InvestigatorConfig;
  }
}
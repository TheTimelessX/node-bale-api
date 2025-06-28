export type chatTypes = 'private' | 'group' | 'channel';
export type stickerTypes = 'regular' | 'mask';
export type medias = "photo" | "video" | "animation" | "audio" | "voice" | "document";
export type inputMedias = "audio" | "document" | "photo" | "video" | "animation";
export type MessageTypes = 
  | 'message'
  | 'photo'
  | 'video'
  | 'text'
  | 'animation'
  | 'audio'
  | 'voice';

export class MaskText{
    text: string;

    constructor(text: string){
        this.text = text;
    }

    bold(): string {
        return `*${this.text}*`;
    }

    italic(): string {
        return `_${this.text}_`;
    }

    createLink(link: string): string {
        return `[${this.text}](${link})`;
    }

    createDocumentation(object: string): string {
        return "```" + `[${this.text}]${object}` + "```";
    }

}

export interface User {
    id?: number | undefined;
    is_bot?: boolean | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    username?: string | undefined;
    language_code?: string | undefined;
}

export interface ChatPhoto {
    small_file_id?: string | undefined;
    small_file_unique_id?: string | undefined;
    big_file_id?: string | undefined;
    big_file_unique_id?: string | undefined;
}

export interface PhotoSizeInterface {
    file_id?: string | undefined;
    file_unique_id?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    file_size?: number | undefined;
}

export interface AnimationInterface {
    file_id?: string | undefined;
    file_unique_id?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    duration?: number | undefined;
    thumbnail?: PhotoSizeInterface;
    file_name?: string | undefined;
    mime_type?: string | undefined;
    file_size?: number | undefined;
}

export interface AudioInterface {
    file_id?: string | undefined;
    file_unique_id?: string | undefined;
    duration?: number | undefined;
    mime_type?: string | undefined;
    file_size?: number | undefined;
}

export interface DocumentLikeInterface {
    file_id?: string | undefined;
    file_unique_id?: string | undefined;
    thumbnail?: PhotoSizeInterface;
    file_name?: string | undefined;
    mime_type?: string | undefined;
    file_size?: number | undefined;
}

export interface VideoInterface {
    file_id?: string | undefined;
    file_unique_id?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    duration?: number | undefined;
    //file_name?: string | undefined;
    mime_type?: string | undefined;
    file_size?: number | undefined;
    thumbnail?: PhotoSizeInterface | undefined;
}

export interface VoiceInterface {
    file_id?: string | undefined;
    file_unique_id?: string | undefined;
    duration?: number | undefined;
    mime_type?: string | undefined;
    file_size?: number | undefined;
}

export interface ContactInterface {
    phone_number?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    user_id?: number | undefined;
}

export interface ContactArray {
    contacts?: Array<ContactInterface> | [] | undefined;
}

export interface LocationInterface {
    longitude?: number | undefined;
    latitude?: number | undefined;
}

export interface FileInterface {
    id?: string | undefined;
    unique_id?: string | undefined;
    size?: number | undefined;
    path?: string | undefined;
}

export interface StickerInterface {
    file_id?: string | undefined;
    file_unique_id?: string | undefined;
    file_size?: number | undefined;
    type?: stickerTypes | undefined;
    width?: number | undefined;
    height?: number | undefined;
    is_animated?: boolean | undefined;
    is_video?: boolean | undefined;
    thumbnail?: PhotoSizeInterface | undefined;
    set_name?: string | undefined;
}

export interface StickerSetInterface {
    name?: string | undefined;
    title?: string | undefined;
    stickers?: Array<StickerInterface> | [] | undefined;
    thumbnail?: PhotoSizeInterface | undefined;
}

interface InlineKeyboardNotSuggest {
    text: string;
    callback_data?: string;
    callback_url?: string;
}

type inline_buttons = InlineKeyboardNotSuggest[];
export type InlineKeyboard = inline_buttons[];

interface ReplyKeyboardNotSuggest {
    text: string;
    resize_keyboard?: boolean | undefined;
    one_time_keyboard?: boolean | undefined;
    request_contact?: boolean | undefined;
    request_location?: boolean | undefined;
}

type reply_buttons = ReplyKeyboardNotSuggest[];
export type ReplyKeyboard = reply_buttons[];

export interface Chat {
    id?: number | undefined;
    type?: chatTypes | undefined;
    title?: string | undefined;
    username?: string | undefined;
    photo?: ChatPhoto | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    invite_link?: string | undefined;
}

export interface Invoice {
    chat_id?: number | undefined;
    title?: string | undefined;
    description?: string | undefined;
    payload?: string | undefined;
    provider_token?: string | undefined;
    photo_url?: string | undefined;
    reply_to_message_id?: number | undefined;
    reply_markup?: InlineKeyboard | ReplyKeyboard | undefined;
    prices?: Array<Map<string, string>>;
}

export interface CallbackQuery {
    id?: string | undefined;
    from?: User | undefined;
    data?: string | undefined;
    inline_message_id?: number | undefined;
    message?: MessageForm | undefined;
    chat_instance?: number | undefined;
}

export interface ReplyToMessage {
    id?: number | undefined;
    from?: User | undefined;
    date?: number | undefined;
    chat?: Chat | undefined;
    forward_from?: User | undefined;
    forward_from_chat?: Chat | undefined;
    forward_from_message_id?: number | undefined;
    forward_date?: number | undefined;
    edit_date?: number | undefined;
    text: string | undefined;
    animation?: AnimationInterface | undefined;
    audio?: AudioInterface | undefined;
    voice?: VoiceInterface | undefined;
    document?: DocumentLikeInterface | undefined;
    video?: VideoInterface | undefined;
    photo?: Array<PhotoSizeInterface> | Array<any> | undefined;
    sticker?: StickerInterface | undefined;
    caption?: string | undefined;
    contact?: ContactInterface | undefined;
    location?: LocationInterface | undefined;
    new_chat_members?: Array<User> | undefined;
    left_chat_member?: User | undefined;
    invoice?: Invoice | undefined;
    successful_payment?: Map<string, string> | undefined;
    reply_markup?: InlineKeyboard | ReplyKeyboard | undefined;
}

export interface MessageForm extends ReplyToMessage {
    reply_to_message?: ReplyToMessage | undefined;
}

export interface WebhookReturner {
    ok?: boolean;
    result?: boolean | string | any;
}

export interface Webhook {
    url?: string;
    has_custom_certificate?: boolean;
    pending_update_count?: number;
}

export interface CopyMessage {
    message_id?: number;
    from?: User | undefined;
    chat?: Chat | undefined;
    date?: number;
}

export interface InputMediaPhoto {
    type: inputMedias;
    media: string;
    caption?: string;
}

export interface InputMediaVideo {
    type: inputMedias;
    media: string;
    thumbnail?: string;
    caption?: string;
    height?: number;
    width?: number;
    duration?: number;
}

export interface InputMediaAnimation extends InputMediaVideo {}

export interface InputMediaAudio {
    type: inputMedias;
    media: string;
    thumbnail?: string;
    caption?: string;
    title?: string;
    duration?: number;
}

export interface InputMediaDocument {
    type: inputMedias;
    media: string;
    thumbnail?: string;
    caption?: string;
}

export interface Media {
    media: InputMediaPhoto[] | InputMediaVideo[] | InputMediaAnimation[] | InputMediaAudio[] | InputMediaDocument[];
}

export interface MediaOutput {
    message_id?: number;
    from?: User | undefined;
    chat?: Chat | undefined;
    date?: number;
    media_group_id?: string;
}

export interface SendMediaGroupOptions {
    reply_to_message_id?: number;
}

export interface CallbackQueryOptions {
    text?: string;
    show_alert?: boolean;
}

export interface CallbackQueryAnswer {
    ok?: boolean;
    result?: boolean;
}

type keyboardTypes = "inline_keyboard" | "keyboard";

export interface SendMessageOptions {
    reply_to_message_id?: number | undefined;
    reply_markup?: InlineKeyboard | ReplyKeyboard | undefined;
    keyboard_mode?: keyboardTypes | undefined;
}

export interface editMessageTextOptions {
    reply_markup?: InlineKeyboard | ReplyKeyboard | undefined;
    keyboard_mode?: keyboardTypes | undefined;
}

export interface ConstructorOptions {
    polling_interval: number | undefined;
    polling: boolean | undefined;
}

export interface ForwardOptions {
    message_id?: number | undefined;
    to_chat?: number | undefined;
}

export interface MediaOptions {
    reply_to_message_id?: number | undefined;
    reply_markup?: ReplyKeyboard | undefined;
    caption?: string | undefined;
}

export interface MediaUpload {
    path?: string;
    file_id?: string | undefined;
    chat_id: number;
    media: medias;
    caption?: string | undefined;
    reply_to_message_id?: number | undefined;
    reply_markup?: ReplyKeyboard | undefined;
}

export interface PhotoCallback {
    id?: number | undefined;
    from?: User | undefined;
    date?: number | undefined;
    chat?: Chat | undefined;
    photo?: Array<PhotoSizeInterface> | undefined;
    caption?: string | undefined;
}

export interface VideoCallback {
    file_id?: string | undefined;
    file_unique_id?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    duration?: number | undefined;
    thumbnail?: PhotoSizeInterface | undefined;
    file_name?: string | undefined;
    mime_type?: string | undefined;
    file_size?: number | undefined;
}

export interface reWrite {
    ok: boolean;
    error_message?: string | undefined;
    data?: string | undefined;
}

export interface newInviteLink {
    invite_link?: string | undefined;
    creator?: User | undefined;
    creates_join_request?: boolean | undefined;
    is_primary?: boolean | undefined;
    is_revoked?: boolean | undefined;
    name?: string | undefined;
    expire_date?: number | undefined;
    member_limit?: number | undefined;
    pending_join_request_count?: number | undefined;
}

export interface Promotion {
    can_change_info?: boolean | undefined;
    can_post_messages?: boolean | undefined;
    can_edit_messages?: boolean | undefined;
    can_delete_messages?: boolean | undefined;
    can_manage_video_chats?: boolean | undefined;
    can_invite_users?: boolean | undefined;
    can_restrict_members?: boolean | undefined;
}

module.exports = { MaskText };

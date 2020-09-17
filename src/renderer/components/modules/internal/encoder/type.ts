export interface MediaData {
    streams: Stream[];
    format: Format;
}

export interface Format {
    filename: string;
    nb_streams: number;
    nb_programs: number;
    format_name: string;
    format_long_name: string;
    start_time: string;
    duration: string;
    size: string;
    bit_rate: string;
    probe_score: number;
    tags: FormatTags;
}

export interface FormatTags {
    major_brand: string;
    minor_version: string;
    compatible_brands: string;
    creation_time: Date;
}

export interface Stream {
    index: number;
    codec_name: FFProbeFileFormat;
    codec_long_name: string;
    profile: string;
    codec_type: 'video' | 'audio';
    codec_time_base: string;
    codec_tag_string: string;
    codec_tag: string;
    width?: number;
    height?: number;
    coded_width?: number;
    coded_height?: number;
    has_b_frames?: number;
    sample_aspect_ratio?: string;
    display_aspect_ratio?: string;
    pix_fmt?: string;
    level?: number;
    color_range?: string;
    color_space?: string;
    color_transfer?: string;
    color_primaries?: string;
    chroma_location?: string;
    refs?: number;
    is_avc?: string;
    nal_length_size?: string;
    r_frame_rate: string;
    avg_frame_rate: string;
    time_base: string;
    start_pts: number;
    start_time: string;
    duration_ts: number;
    duration: string;
    bit_rate: string;
    bits_per_raw_sample?: string;
    nb_frames: string;
    disposition: { [key: string]: number };
    tags: StreamTags;
    sample_fmt?: string;
    sample_rate?: string;
    channels?: number;
    channel_layout?: string;
    bits_per_sample?: number;
    max_bit_rate?: string;
}

export interface StreamTags {
    creation_time: Date;
    language: string;
}

export type Encoder = {
    format: 'x265' | 'x264',
    type: 'CPU' | 'GPU',
    value: {
        ffmpeg: string,
        ffprobe: FFProbeFileFormat
    }
}
export const encoders: Encoder[] = [
    {
        format: 'x265',
        type: 'CPU',
        value: {
            ffmpeg: 'libx265',
            ffprobe: 'hevc'
        }
    },
    {
        format: 'x265',
        type: 'GPU',
        value: {
            ffmpeg: 'hevc_nvenc',
            ffprobe: 'hevc'
        }
    }
];

export type FFProbeFileFormat = 'hevc' | 'h264';


export type File = {
    path: string,
    name: string
};

export interface Media {
    file: File,
    property: MediaData,
}

export type ProcessData = {
    media: Media,
    percentage: number
};

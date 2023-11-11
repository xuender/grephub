import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace pb. */
export namespace pb {

    /** Properties of an Ack. */
    interface IAck {

        /** Ack file */
        file?: (string|null);

        /** Ack mates */
        mates?: (pb.IMate[]|null);
    }

    /** Represents an Ack. */
    class Ack implements IAck {

        /**
         * Constructs a new Ack.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IAck);

        /** Ack file. */
        public file: string;

        /** Ack mates. */
        public mates: pb.IMate[];

        /**
         * Creates a new Ack instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Ack instance
         */
        public static create(properties?: pb.IAck): pb.Ack;

        /**
         * Encodes the specified Ack message. Does not implicitly {@link pb.Ack.verify|verify} messages.
         * @param message Ack message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Ack message, length delimited. Does not implicitly {@link pb.Ack.verify|verify} messages.
         * @param message Ack message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Ack message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Ack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Ack;

        /**
         * Decodes an Ack message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Ack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Ack;

        /**
         * Verifies an Ack message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Ack message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Ack
         */
        public static fromObject(object: { [k: string]: any }): pb.Ack;

        /**
         * Creates a plain object from an Ack message. Also converts values to other types if specified.
         * @param message Ack
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Ack, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Ack to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Ack
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Config. */
    interface IConfig {

        /** Config query */
        query?: (pb.IQuery|null);

        /** Config dirs */
        dirs?: (string[]|null);
    }

    /** Represents a Config. */
    class Config implements IConfig {

        /**
         * Constructs a new Config.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IConfig);

        /** Config query. */
        public query?: (pb.IQuery|null);

        /** Config dirs. */
        public dirs: string[];

        /**
         * Creates a new Config instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Config instance
         */
        public static create(properties?: pb.IConfig): pb.Config;

        /**
         * Encodes the specified Config message. Does not implicitly {@link pb.Config.verify|verify} messages.
         * @param message Config message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IConfig, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Config message, length delimited. Does not implicitly {@link pb.Config.verify|verify} messages.
         * @param message Config message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IConfig, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Config message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Config;

        /**
         * Decodes a Config message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Config;

        /**
         * Verifies a Config message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Config message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Config
         */
        public static fromObject(object: { [k: string]: any }): pb.Config;

        /**
         * Creates a plain object from a Config message. Also converts values to other types if specified.
         * @param message Config
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Config, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Config to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Config
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Hit. */
    interface IHit {

        /** Hit col */
        col?: (number|null);

        /** Hit len */
        len?: (number|null);
    }

    /** Represents a Hit. */
    class Hit implements IHit {

        /**
         * Constructs a new Hit.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IHit);

        /** Hit col. */
        public col: number;

        /** Hit len. */
        public len: number;

        /**
         * Creates a new Hit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Hit instance
         */
        public static create(properties?: pb.IHit): pb.Hit;

        /**
         * Encodes the specified Hit message. Does not implicitly {@link pb.Hit.verify|verify} messages.
         * @param message Hit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IHit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Hit message, length delimited. Does not implicitly {@link pb.Hit.verify|verify} messages.
         * @param message Hit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IHit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Hit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Hit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Hit;

        /**
         * Decodes a Hit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Hit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Hit;

        /**
         * Verifies a Hit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Hit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Hit
         */
        public static fromObject(object: { [k: string]: any }): pb.Hit;

        /**
         * Creates a plain object from a Hit message. Also converts values to other types if specified.
         * @param message Hit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Hit, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Hit to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Hit
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Mate. */
    interface IMate {

        /** Mate text */
        text?: (string|null);

        /** Mate row */
        row?: (number|null);

        /** Mate hits */
        hits?: (pb.IHit[]|null);
    }

    /** Represents a Mate. */
    class Mate implements IMate {

        /**
         * Constructs a new Mate.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IMate);

        /** Mate text. */
        public text: string;

        /** Mate row. */
        public row: number;

        /** Mate hits. */
        public hits: pb.IHit[];

        /**
         * Creates a new Mate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Mate instance
         */
        public static create(properties?: pb.IMate): pb.Mate;

        /**
         * Encodes the specified Mate message. Does not implicitly {@link pb.Mate.verify|verify} messages.
         * @param message Mate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IMate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Mate message, length delimited. Does not implicitly {@link pb.Mate.verify|verify} messages.
         * @param message Mate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IMate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Mate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Mate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Mate;

        /**
         * Decodes a Mate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Mate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Mate;

        /**
         * Verifies a Mate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Mate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Mate
         */
        public static fromObject(object: { [k: string]: any }): pb.Mate;

        /**
         * Creates a plain object from a Mate message. Also converts values to other types if specified.
         * @param message Mate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Mate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Mate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Mate
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Msg. */
    interface IMsg {

        /** Msg type */
        type?: (pb.Type|null);

        /** Msg query */
        query?: (pb.IQuery|null);

        /** Msg value */
        value?: (string|null);

        /** Msg ack */
        ack?: (pb.IAck[]|null);

        /** Msg dirs */
        dirs?: (string[]|null);
    }

    /** Represents a Msg. */
    class Msg implements IMsg {

        /**
         * Constructs a new Msg.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IMsg);

        /** Msg type. */
        public type: pb.Type;

        /** Msg query. */
        public query?: (pb.IQuery|null);

        /** Msg value. */
        public value: string;

        /** Msg ack. */
        public ack: pb.IAck[];

        /** Msg dirs. */
        public dirs: string[];

        /**
         * Creates a new Msg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Msg instance
         */
        public static create(properties?: pb.IMsg): pb.Msg;

        /**
         * Encodes the specified Msg message. Does not implicitly {@link pb.Msg.verify|verify} messages.
         * @param message Msg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Msg message, length delimited. Does not implicitly {@link pb.Msg.verify|verify} messages.
         * @param message Msg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Msg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Msg;

        /**
         * Decodes a Msg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Msg;

        /**
         * Verifies a Msg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Msg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Msg
         */
        public static fromObject(object: { [k: string]: any }): pb.Msg;

        /**
         * Creates a plain object from a Msg message. Also converts values to other types if specified.
         * @param message Msg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Msg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Msg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Msg
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Type enum. */
    enum Type {
        config = 0,
        query = 1,
        ack = 2,
        open = 3,
        stop = 4,
        alert = 5,
        addDirs = 6,
        delDir = 7
    }

    /** Properties of a Query. */
    interface IQuery {

        /** Query pattern */
        pattern?: (string|null);

        /** Query maxCount */
        maxCount?: (number|null);

        /** Query searcher */
        searcher?: (pb.Searcher|null);

        /** Query paths */
        paths?: (string[]|null);

        /** Query rgTypes */
        rgTypes?: (string[]|null);

        /** Query agTypes */
        agTypes?: (string[]|null);

        /** Query ugTypes */
        ugTypes?: (string[]|null);

        /** Query grepType */
        grepType?: (string|null);
    }

    /** Represents a Query. */
    class Query implements IQuery {

        /**
         * Constructs a new Query.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IQuery);

        /** Query pattern. */
        public pattern: string;

        /** Query maxCount. */
        public maxCount: number;

        /** Query searcher. */
        public searcher: pb.Searcher;

        /** Query paths. */
        public paths: string[];

        /** Query rgTypes. */
        public rgTypes: string[];

        /** Query agTypes. */
        public agTypes: string[];

        /** Query ugTypes. */
        public ugTypes: string[];

        /** Query grepType. */
        public grepType: string;

        /**
         * Creates a new Query instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Query instance
         */
        public static create(properties?: pb.IQuery): pb.Query;

        /**
         * Encodes the specified Query message. Does not implicitly {@link pb.Query.verify|verify} messages.
         * @param message Query message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IQuery, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Query message, length delimited. Does not implicitly {@link pb.Query.verify|verify} messages.
         * @param message Query message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IQuery, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Query message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Query
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Query;

        /**
         * Decodes a Query message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Query
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Query;

        /**
         * Verifies a Query message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Query message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Query
         */
        public static fromObject(object: { [k: string]: any }): pb.Query;

        /**
         * Creates a plain object from a Query message. Also converts values to other types if specified.
         * @param message Query
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Query, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Query to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Query
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Searcher enum. */
    enum Searcher {
        rg = 0,
        ug = 1,
        ag = 2
    }

    /** Properties of a Result. */
    interface IResult {

        /** Result query */
        query?: (pb.IQuery|null);

        /** Result acks */
        acks?: (pb.IAck[]|null);
    }

    /** Represents a Result. */
    class Result implements IResult {

        /**
         * Constructs a new Result.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IResult);

        /** Result query. */
        public query?: (pb.IQuery|null);

        /** Result acks. */
        public acks: pb.IAck[];

        /**
         * Creates a new Result instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Result instance
         */
        public static create(properties?: pb.IResult): pb.Result;

        /**
         * Encodes the specified Result message. Does not implicitly {@link pb.Result.verify|verify} messages.
         * @param message Result message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Result message, length delimited. Does not implicitly {@link pb.Result.verify|verify} messages.
         * @param message Result message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Result message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Result
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Result;

        /**
         * Decodes a Result message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Result
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Result;

        /**
         * Verifies a Result message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Result message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Result
         */
        public static fromObject(object: { [k: string]: any }): pb.Result;

        /**
         * Creates a plain object from a Result message. Also converts values to other types if specified.
         * @param message Result
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Result, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Result to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Result
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pb = (function() {

    /**
     * Namespace pb.
     * @exports pb
     * @namespace
     */
    var pb = {};

    pb.Ack = (function() {

        /**
         * Properties of an Ack.
         * @memberof pb
         * @interface IAck
         * @property {string|null} [file] Ack file
         * @property {Array.<pb.IMate>|null} [mates] Ack mates
         */

        /**
         * Constructs a new Ack.
         * @memberof pb
         * @classdesc Represents an Ack.
         * @implements IAck
         * @constructor
         * @param {pb.IAck=} [properties] Properties to set
         */
        function Ack(properties) {
            this.mates = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Ack file.
         * @member {string} file
         * @memberof pb.Ack
         * @instance
         */
        Ack.prototype.file = "";

        /**
         * Ack mates.
         * @member {Array.<pb.IMate>} mates
         * @memberof pb.Ack
         * @instance
         */
        Ack.prototype.mates = $util.emptyArray;

        /**
         * Creates a new Ack instance using the specified properties.
         * @function create
         * @memberof pb.Ack
         * @static
         * @param {pb.IAck=} [properties] Properties to set
         * @returns {pb.Ack} Ack instance
         */
        Ack.create = function create(properties) {
            return new Ack(properties);
        };

        /**
         * Encodes the specified Ack message. Does not implicitly {@link pb.Ack.verify|verify} messages.
         * @function encode
         * @memberof pb.Ack
         * @static
         * @param {pb.IAck} message Ack message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ack.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.file != null && Object.hasOwnProperty.call(message, "file"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.file);
            if (message.mates != null && message.mates.length)
                for (var i = 0; i < message.mates.length; ++i)
                    $root.pb.Mate.encode(message.mates[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Ack message, length delimited. Does not implicitly {@link pb.Ack.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Ack
         * @static
         * @param {pb.IAck} message Ack message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ack.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Ack message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Ack
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Ack} Ack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ack.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Ack();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.file = reader.string();
                        break;
                    }
                case 2: {
                        if (!(message.mates && message.mates.length))
                            message.mates = [];
                        message.mates.push($root.pb.Mate.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Ack message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Ack
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Ack} Ack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ack.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Ack message.
         * @function verify
         * @memberof pb.Ack
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Ack.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.file != null && message.hasOwnProperty("file"))
                if (!$util.isString(message.file))
                    return "file: string expected";
            if (message.mates != null && message.hasOwnProperty("mates")) {
                if (!Array.isArray(message.mates))
                    return "mates: array expected";
                for (var i = 0; i < message.mates.length; ++i) {
                    var error = $root.pb.Mate.verify(message.mates[i]);
                    if (error)
                        return "mates." + error;
                }
            }
            return null;
        };

        /**
         * Creates an Ack message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Ack
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Ack} Ack
         */
        Ack.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Ack)
                return object;
            var message = new $root.pb.Ack();
            if (object.file != null)
                message.file = String(object.file);
            if (object.mates) {
                if (!Array.isArray(object.mates))
                    throw TypeError(".pb.Ack.mates: array expected");
                message.mates = [];
                for (var i = 0; i < object.mates.length; ++i) {
                    if (typeof object.mates[i] !== "object")
                        throw TypeError(".pb.Ack.mates: object expected");
                    message.mates[i] = $root.pb.Mate.fromObject(object.mates[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an Ack message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Ack
         * @static
         * @param {pb.Ack} message Ack
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Ack.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.mates = [];
            if (options.defaults)
                object.file = "";
            if (message.file != null && message.hasOwnProperty("file"))
                object.file = message.file;
            if (message.mates && message.mates.length) {
                object.mates = [];
                for (var j = 0; j < message.mates.length; ++j)
                    object.mates[j] = $root.pb.Mate.toObject(message.mates[j], options);
            }
            return object;
        };

        /**
         * Converts this Ack to JSON.
         * @function toJSON
         * @memberof pb.Ack
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Ack.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Ack
         * @function getTypeUrl
         * @memberof pb.Ack
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Ack.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Ack";
        };

        return Ack;
    })();

    pb.Config = (function() {

        /**
         * Properties of a Config.
         * @memberof pb
         * @interface IConfig
         * @property {string|null} [path] Config path
         */

        /**
         * Constructs a new Config.
         * @memberof pb
         * @classdesc Represents a Config.
         * @implements IConfig
         * @constructor
         * @param {pb.IConfig=} [properties] Properties to set
         */
        function Config(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Config path.
         * @member {string} path
         * @memberof pb.Config
         * @instance
         */
        Config.prototype.path = "";

        /**
         * Creates a new Config instance using the specified properties.
         * @function create
         * @memberof pb.Config
         * @static
         * @param {pb.IConfig=} [properties] Properties to set
         * @returns {pb.Config} Config instance
         */
        Config.create = function create(properties) {
            return new Config(properties);
        };

        /**
         * Encodes the specified Config message. Does not implicitly {@link pb.Config.verify|verify} messages.
         * @function encode
         * @memberof pb.Config
         * @static
         * @param {pb.IConfig} message Config message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Config.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.path != null && Object.hasOwnProperty.call(message, "path"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.path);
            return writer;
        };

        /**
         * Encodes the specified Config message, length delimited. Does not implicitly {@link pb.Config.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Config
         * @static
         * @param {pb.IConfig} message Config message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Config.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Config message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Config
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Config} Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Config.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Config();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.path = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Config message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Config
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Config} Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Config.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Config message.
         * @function verify
         * @memberof pb.Config
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Config.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.path != null && message.hasOwnProperty("path"))
                if (!$util.isString(message.path))
                    return "path: string expected";
            return null;
        };

        /**
         * Creates a Config message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Config
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Config} Config
         */
        Config.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Config)
                return object;
            var message = new $root.pb.Config();
            if (object.path != null)
                message.path = String(object.path);
            return message;
        };

        /**
         * Creates a plain object from a Config message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Config
         * @static
         * @param {pb.Config} message Config
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Config.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.path = "";
            if (message.path != null && message.hasOwnProperty("path"))
                object.path = message.path;
            return object;
        };

        /**
         * Converts this Config to JSON.
         * @function toJSON
         * @memberof pb.Config
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Config.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Config
         * @function getTypeUrl
         * @memberof pb.Config
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Config.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Config";
        };

        return Config;
    })();

    pb.Env = (function() {

        /**
         * Properties of an Env.
         * @memberof pb
         * @interface IEnv
         * @property {number|Long|null} [port] Env port
         * @property {string|null} [cfg] Env cfg
         * @property {string|null} [upgrade] Env upgrade
         */

        /**
         * Constructs a new Env.
         * @memberof pb
         * @classdesc Represents an Env.
         * @implements IEnv
         * @constructor
         * @param {pb.IEnv=} [properties] Properties to set
         */
        function Env(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Env port.
         * @member {number|Long} port
         * @memberof pb.Env
         * @instance
         */
        Env.prototype.port = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Env cfg.
         * @member {string} cfg
         * @memberof pb.Env
         * @instance
         */
        Env.prototype.cfg = "";

        /**
         * Env upgrade.
         * @member {string} upgrade
         * @memberof pb.Env
         * @instance
         */
        Env.prototype.upgrade = "";

        /**
         * Creates a new Env instance using the specified properties.
         * @function create
         * @memberof pb.Env
         * @static
         * @param {pb.IEnv=} [properties] Properties to set
         * @returns {pb.Env} Env instance
         */
        Env.create = function create(properties) {
            return new Env(properties);
        };

        /**
         * Encodes the specified Env message. Does not implicitly {@link pb.Env.verify|verify} messages.
         * @function encode
         * @memberof pb.Env
         * @static
         * @param {pb.IEnv} message Env message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Env.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.port != null && Object.hasOwnProperty.call(message, "port"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.port);
            if (message.cfg != null && Object.hasOwnProperty.call(message, "cfg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.cfg);
            if (message.upgrade != null && Object.hasOwnProperty.call(message, "upgrade"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.upgrade);
            return writer;
        };

        /**
         * Encodes the specified Env message, length delimited. Does not implicitly {@link pb.Env.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Env
         * @static
         * @param {pb.IEnv} message Env message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Env.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Env message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Env
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Env} Env
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Env.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Env();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.port = reader.uint64();
                        break;
                    }
                case 2: {
                        message.cfg = reader.string();
                        break;
                    }
                case 3: {
                        message.upgrade = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Env message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Env
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Env} Env
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Env.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Env message.
         * @function verify
         * @memberof pb.Env
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Env.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.port != null && message.hasOwnProperty("port"))
                if (!$util.isInteger(message.port) && !(message.port && $util.isInteger(message.port.low) && $util.isInteger(message.port.high)))
                    return "port: integer|Long expected";
            if (message.cfg != null && message.hasOwnProperty("cfg"))
                if (!$util.isString(message.cfg))
                    return "cfg: string expected";
            if (message.upgrade != null && message.hasOwnProperty("upgrade"))
                if (!$util.isString(message.upgrade))
                    return "upgrade: string expected";
            return null;
        };

        /**
         * Creates an Env message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Env
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Env} Env
         */
        Env.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Env)
                return object;
            var message = new $root.pb.Env();
            if (object.port != null)
                if ($util.Long)
                    (message.port = $util.Long.fromValue(object.port)).unsigned = true;
                else if (typeof object.port === "string")
                    message.port = parseInt(object.port, 10);
                else if (typeof object.port === "number")
                    message.port = object.port;
                else if (typeof object.port === "object")
                    message.port = new $util.LongBits(object.port.low >>> 0, object.port.high >>> 0).toNumber(true);
            if (object.cfg != null)
                message.cfg = String(object.cfg);
            if (object.upgrade != null)
                message.upgrade = String(object.upgrade);
            return message;
        };

        /**
         * Creates a plain object from an Env message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Env
         * @static
         * @param {pb.Env} message Env
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Env.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.port = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.port = options.longs === String ? "0" : 0;
                object.cfg = "";
                object.upgrade = "";
            }
            if (message.port != null && message.hasOwnProperty("port"))
                if (typeof message.port === "number")
                    object.port = options.longs === String ? String(message.port) : message.port;
                else
                    object.port = options.longs === String ? $util.Long.prototype.toString.call(message.port) : options.longs === Number ? new $util.LongBits(message.port.low >>> 0, message.port.high >>> 0).toNumber(true) : message.port;
            if (message.cfg != null && message.hasOwnProperty("cfg"))
                object.cfg = message.cfg;
            if (message.upgrade != null && message.hasOwnProperty("upgrade"))
                object.upgrade = message.upgrade;
            return object;
        };

        /**
         * Converts this Env to JSON.
         * @function toJSON
         * @memberof pb.Env
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Env.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Env
         * @function getTypeUrl
         * @memberof pb.Env
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Env.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Env";
        };

        return Env;
    })();

    pb.Hit = (function() {

        /**
         * Properties of a Hit.
         * @memberof pb
         * @interface IHit
         * @property {number|null} [col] Hit col
         * @property {number|null} [len] Hit len
         */

        /**
         * Constructs a new Hit.
         * @memberof pb
         * @classdesc Represents a Hit.
         * @implements IHit
         * @constructor
         * @param {pb.IHit=} [properties] Properties to set
         */
        function Hit(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Hit col.
         * @member {number} col
         * @memberof pb.Hit
         * @instance
         */
        Hit.prototype.col = 0;

        /**
         * Hit len.
         * @member {number} len
         * @memberof pb.Hit
         * @instance
         */
        Hit.prototype.len = 0;

        /**
         * Creates a new Hit instance using the specified properties.
         * @function create
         * @memberof pb.Hit
         * @static
         * @param {pb.IHit=} [properties] Properties to set
         * @returns {pb.Hit} Hit instance
         */
        Hit.create = function create(properties) {
            return new Hit(properties);
        };

        /**
         * Encodes the specified Hit message. Does not implicitly {@link pb.Hit.verify|verify} messages.
         * @function encode
         * @memberof pb.Hit
         * @static
         * @param {pb.IHit} message Hit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hit.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.col != null && Object.hasOwnProperty.call(message, "col"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.col);
            if (message.len != null && Object.hasOwnProperty.call(message, "len"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.len);
            return writer;
        };

        /**
         * Encodes the specified Hit message, length delimited. Does not implicitly {@link pb.Hit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Hit
         * @static
         * @param {pb.IHit} message Hit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Hit message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Hit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Hit} Hit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hit.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Hit();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.col = reader.uint32();
                        break;
                    }
                case 2: {
                        message.len = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Hit message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Hit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Hit} Hit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Hit message.
         * @function verify
         * @memberof pb.Hit
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Hit.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.col != null && message.hasOwnProperty("col"))
                if (!$util.isInteger(message.col))
                    return "col: integer expected";
            if (message.len != null && message.hasOwnProperty("len"))
                if (!$util.isInteger(message.len))
                    return "len: integer expected";
            return null;
        };

        /**
         * Creates a Hit message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Hit
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Hit} Hit
         */
        Hit.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Hit)
                return object;
            var message = new $root.pb.Hit();
            if (object.col != null)
                message.col = object.col >>> 0;
            if (object.len != null)
                message.len = object.len >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a Hit message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Hit
         * @static
         * @param {pb.Hit} message Hit
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Hit.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.col = 0;
                object.len = 0;
            }
            if (message.col != null && message.hasOwnProperty("col"))
                object.col = message.col;
            if (message.len != null && message.hasOwnProperty("len"))
                object.len = message.len;
            return object;
        };

        /**
         * Converts this Hit to JSON.
         * @function toJSON
         * @memberof pb.Hit
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Hit.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Hit
         * @function getTypeUrl
         * @memberof pb.Hit
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Hit.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Hit";
        };

        return Hit;
    })();

    pb.Mate = (function() {

        /**
         * Properties of a Mate.
         * @memberof pb
         * @interface IMate
         * @property {string|null} [text] Mate text
         * @property {number|null} [row] Mate row
         * @property {Array.<pb.IHit>|null} [hits] Mate hits
         */

        /**
         * Constructs a new Mate.
         * @memberof pb
         * @classdesc Represents a Mate.
         * @implements IMate
         * @constructor
         * @param {pb.IMate=} [properties] Properties to set
         */
        function Mate(properties) {
            this.hits = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Mate text.
         * @member {string} text
         * @memberof pb.Mate
         * @instance
         */
        Mate.prototype.text = "";

        /**
         * Mate row.
         * @member {number} row
         * @memberof pb.Mate
         * @instance
         */
        Mate.prototype.row = 0;

        /**
         * Mate hits.
         * @member {Array.<pb.IHit>} hits
         * @memberof pb.Mate
         * @instance
         */
        Mate.prototype.hits = $util.emptyArray;

        /**
         * Creates a new Mate instance using the specified properties.
         * @function create
         * @memberof pb.Mate
         * @static
         * @param {pb.IMate=} [properties] Properties to set
         * @returns {pb.Mate} Mate instance
         */
        Mate.create = function create(properties) {
            return new Mate(properties);
        };

        /**
         * Encodes the specified Mate message. Does not implicitly {@link pb.Mate.verify|verify} messages.
         * @function encode
         * @memberof pb.Mate
         * @static
         * @param {pb.IMate} message Mate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Mate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
            if (message.row != null && Object.hasOwnProperty.call(message, "row"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.row);
            if (message.hits != null && message.hits.length)
                for (var i = 0; i < message.hits.length; ++i)
                    $root.pb.Hit.encode(message.hits[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Mate message, length delimited. Does not implicitly {@link pb.Mate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Mate
         * @static
         * @param {pb.IMate} message Mate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Mate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Mate message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Mate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Mate} Mate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Mate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Mate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.text = reader.string();
                        break;
                    }
                case 2: {
                        message.row = reader.uint32();
                        break;
                    }
                case 3: {
                        if (!(message.hits && message.hits.length))
                            message.hits = [];
                        message.hits.push($root.pb.Hit.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Mate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Mate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Mate} Mate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Mate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Mate message.
         * @function verify
         * @memberof pb.Mate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Mate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.text != null && message.hasOwnProperty("text"))
                if (!$util.isString(message.text))
                    return "text: string expected";
            if (message.row != null && message.hasOwnProperty("row"))
                if (!$util.isInteger(message.row))
                    return "row: integer expected";
            if (message.hits != null && message.hasOwnProperty("hits")) {
                if (!Array.isArray(message.hits))
                    return "hits: array expected";
                for (var i = 0; i < message.hits.length; ++i) {
                    var error = $root.pb.Hit.verify(message.hits[i]);
                    if (error)
                        return "hits." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Mate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Mate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Mate} Mate
         */
        Mate.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Mate)
                return object;
            var message = new $root.pb.Mate();
            if (object.text != null)
                message.text = String(object.text);
            if (object.row != null)
                message.row = object.row >>> 0;
            if (object.hits) {
                if (!Array.isArray(object.hits))
                    throw TypeError(".pb.Mate.hits: array expected");
                message.hits = [];
                for (var i = 0; i < object.hits.length; ++i) {
                    if (typeof object.hits[i] !== "object")
                        throw TypeError(".pb.Mate.hits: object expected");
                    message.hits[i] = $root.pb.Hit.fromObject(object.hits[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Mate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Mate
         * @static
         * @param {pb.Mate} message Mate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Mate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.hits = [];
            if (options.defaults) {
                object.text = "";
                object.row = 0;
            }
            if (message.text != null && message.hasOwnProperty("text"))
                object.text = message.text;
            if (message.row != null && message.hasOwnProperty("row"))
                object.row = message.row;
            if (message.hits && message.hits.length) {
                object.hits = [];
                for (var j = 0; j < message.hits.length; ++j)
                    object.hits[j] = $root.pb.Hit.toObject(message.hits[j], options);
            }
            return object;
        };

        /**
         * Converts this Mate to JSON.
         * @function toJSON
         * @memberof pb.Mate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Mate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Mate
         * @function getTypeUrl
         * @memberof pb.Mate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Mate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Mate";
        };

        return Mate;
    })();

    pb.Msg = (function() {

        /**
         * Properties of a Msg.
         * @memberof pb
         * @interface IMsg
         * @property {pb.IQuery|null} [query] Msg query
         * @property {Array.<pb.IAck>|null} [acks] Msg acks
         */

        /**
         * Constructs a new Msg.
         * @memberof pb
         * @classdesc Represents a Msg.
         * @implements IMsg
         * @constructor
         * @param {pb.IMsg=} [properties] Properties to set
         */
        function Msg(properties) {
            this.acks = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Msg query.
         * @member {pb.IQuery|null|undefined} query
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.query = null;

        /**
         * Msg acks.
         * @member {Array.<pb.IAck>} acks
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.acks = $util.emptyArray;

        /**
         * Creates a new Msg instance using the specified properties.
         * @function create
         * @memberof pb.Msg
         * @static
         * @param {pb.IMsg=} [properties] Properties to set
         * @returns {pb.Msg} Msg instance
         */
        Msg.create = function create(properties) {
            return new Msg(properties);
        };

        /**
         * Encodes the specified Msg message. Does not implicitly {@link pb.Msg.verify|verify} messages.
         * @function encode
         * @memberof pb.Msg
         * @static
         * @param {pb.IMsg} message Msg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Msg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.query != null && Object.hasOwnProperty.call(message, "query"))
                $root.pb.Query.encode(message.query, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.acks != null && message.acks.length)
                for (var i = 0; i < message.acks.length; ++i)
                    $root.pb.Ack.encode(message.acks[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Msg message, length delimited. Does not implicitly {@link pb.Msg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Msg
         * @static
         * @param {pb.IMsg} message Msg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Msg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Msg message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Msg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Msg} Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Msg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Msg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.query = $root.pb.Query.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        if (!(message.acks && message.acks.length))
                            message.acks = [];
                        message.acks.push($root.pb.Ack.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Msg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Msg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Msg} Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Msg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Msg message.
         * @function verify
         * @memberof pb.Msg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Msg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.query != null && message.hasOwnProperty("query")) {
                var error = $root.pb.Query.verify(message.query);
                if (error)
                    return "query." + error;
            }
            if (message.acks != null && message.hasOwnProperty("acks")) {
                if (!Array.isArray(message.acks))
                    return "acks: array expected";
                for (var i = 0; i < message.acks.length; ++i) {
                    var error = $root.pb.Ack.verify(message.acks[i]);
                    if (error)
                        return "acks." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Msg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Msg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Msg} Msg
         */
        Msg.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Msg)
                return object;
            var message = new $root.pb.Msg();
            if (object.query != null) {
                if (typeof object.query !== "object")
                    throw TypeError(".pb.Msg.query: object expected");
                message.query = $root.pb.Query.fromObject(object.query);
            }
            if (object.acks) {
                if (!Array.isArray(object.acks))
                    throw TypeError(".pb.Msg.acks: array expected");
                message.acks = [];
                for (var i = 0; i < object.acks.length; ++i) {
                    if (typeof object.acks[i] !== "object")
                        throw TypeError(".pb.Msg.acks: object expected");
                    message.acks[i] = $root.pb.Ack.fromObject(object.acks[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Msg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Msg
         * @static
         * @param {pb.Msg} message Msg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Msg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.acks = [];
            if (options.defaults)
                object.query = null;
            if (message.query != null && message.hasOwnProperty("query"))
                object.query = $root.pb.Query.toObject(message.query, options);
            if (message.acks && message.acks.length) {
                object.acks = [];
                for (var j = 0; j < message.acks.length; ++j)
                    object.acks[j] = $root.pb.Ack.toObject(message.acks[j], options);
            }
            return object;
        };

        /**
         * Converts this Msg to JSON.
         * @function toJSON
         * @memberof pb.Msg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Msg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Msg
         * @function getTypeUrl
         * @memberof pb.Msg
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Msg.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Msg";
        };

        return Msg;
    })();

    pb.Query = (function() {

        /**
         * Properties of a Query.
         * @memberof pb
         * @interface IQuery
         * @property {string|null} [pattern] Query pattern
         * @property {number|null} [maxCount] Query maxCount
         * @property {Array.<string>|null} [paths] Query paths
         */

        /**
         * Constructs a new Query.
         * @memberof pb
         * @classdesc Represents a Query.
         * @implements IQuery
         * @constructor
         * @param {pb.IQuery=} [properties] Properties to set
         */
        function Query(properties) {
            this.paths = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Query pattern.
         * @member {string} pattern
         * @memberof pb.Query
         * @instance
         */
        Query.prototype.pattern = "";

        /**
         * Query maxCount.
         * @member {number} maxCount
         * @memberof pb.Query
         * @instance
         */
        Query.prototype.maxCount = 0;

        /**
         * Query paths.
         * @member {Array.<string>} paths
         * @memberof pb.Query
         * @instance
         */
        Query.prototype.paths = $util.emptyArray;

        /**
         * Creates a new Query instance using the specified properties.
         * @function create
         * @memberof pb.Query
         * @static
         * @param {pb.IQuery=} [properties] Properties to set
         * @returns {pb.Query} Query instance
         */
        Query.create = function create(properties) {
            return new Query(properties);
        };

        /**
         * Encodes the specified Query message. Does not implicitly {@link pb.Query.verify|verify} messages.
         * @function encode
         * @memberof pb.Query
         * @static
         * @param {pb.IQuery} message Query message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Query.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pattern != null && Object.hasOwnProperty.call(message, "pattern"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.pattern);
            if (message.maxCount != null && Object.hasOwnProperty.call(message, "maxCount"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.maxCount);
            if (message.paths != null && message.paths.length)
                for (var i = 0; i < message.paths.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.paths[i]);
            return writer;
        };

        /**
         * Encodes the specified Query message, length delimited. Does not implicitly {@link pb.Query.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Query
         * @static
         * @param {pb.IQuery} message Query message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Query.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Query message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Query
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Query} Query
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Query.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Query();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pattern = reader.string();
                        break;
                    }
                case 2: {
                        message.maxCount = reader.uint32();
                        break;
                    }
                case 3: {
                        if (!(message.paths && message.paths.length))
                            message.paths = [];
                        message.paths.push(reader.string());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Query message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Query
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Query} Query
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Query.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Query message.
         * @function verify
         * @memberof pb.Query
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Query.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pattern != null && message.hasOwnProperty("pattern"))
                if (!$util.isString(message.pattern))
                    return "pattern: string expected";
            if (message.maxCount != null && message.hasOwnProperty("maxCount"))
                if (!$util.isInteger(message.maxCount))
                    return "maxCount: integer expected";
            if (message.paths != null && message.hasOwnProperty("paths")) {
                if (!Array.isArray(message.paths))
                    return "paths: array expected";
                for (var i = 0; i < message.paths.length; ++i)
                    if (!$util.isString(message.paths[i]))
                        return "paths: string[] expected";
            }
            return null;
        };

        /**
         * Creates a Query message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Query
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Query} Query
         */
        Query.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Query)
                return object;
            var message = new $root.pb.Query();
            if (object.pattern != null)
                message.pattern = String(object.pattern);
            if (object.maxCount != null)
                message.maxCount = object.maxCount >>> 0;
            if (object.paths) {
                if (!Array.isArray(object.paths))
                    throw TypeError(".pb.Query.paths: array expected");
                message.paths = [];
                for (var i = 0; i < object.paths.length; ++i)
                    message.paths[i] = String(object.paths[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a Query message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Query
         * @static
         * @param {pb.Query} message Query
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Query.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.paths = [];
            if (options.defaults) {
                object.pattern = "";
                object.maxCount = 0;
            }
            if (message.pattern != null && message.hasOwnProperty("pattern"))
                object.pattern = message.pattern;
            if (message.maxCount != null && message.hasOwnProperty("maxCount"))
                object.maxCount = message.maxCount;
            if (message.paths && message.paths.length) {
                object.paths = [];
                for (var j = 0; j < message.paths.length; ++j)
                    object.paths[j] = message.paths[j];
            }
            return object;
        };

        /**
         * Converts this Query to JSON.
         * @function toJSON
         * @memberof pb.Query
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Query.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Query
         * @function getTypeUrl
         * @memberof pb.Query
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Query.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Query";
        };

        return Query;
    })();

    pb.Result = (function() {

        /**
         * Properties of a Result.
         * @memberof pb
         * @interface IResult
         * @property {pb.IQuery|null} [query] Result query
         * @property {Array.<pb.IAck>|null} [acks] Result acks
         */

        /**
         * Constructs a new Result.
         * @memberof pb
         * @classdesc Represents a Result.
         * @implements IResult
         * @constructor
         * @param {pb.IResult=} [properties] Properties to set
         */
        function Result(properties) {
            this.acks = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Result query.
         * @member {pb.IQuery|null|undefined} query
         * @memberof pb.Result
         * @instance
         */
        Result.prototype.query = null;

        /**
         * Result acks.
         * @member {Array.<pb.IAck>} acks
         * @memberof pb.Result
         * @instance
         */
        Result.prototype.acks = $util.emptyArray;

        /**
         * Creates a new Result instance using the specified properties.
         * @function create
         * @memberof pb.Result
         * @static
         * @param {pb.IResult=} [properties] Properties to set
         * @returns {pb.Result} Result instance
         */
        Result.create = function create(properties) {
            return new Result(properties);
        };

        /**
         * Encodes the specified Result message. Does not implicitly {@link pb.Result.verify|verify} messages.
         * @function encode
         * @memberof pb.Result
         * @static
         * @param {pb.IResult} message Result message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Result.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.query != null && Object.hasOwnProperty.call(message, "query"))
                $root.pb.Query.encode(message.query, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.acks != null && message.acks.length)
                for (var i = 0; i < message.acks.length; ++i)
                    $root.pb.Ack.encode(message.acks[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Result message, length delimited. Does not implicitly {@link pb.Result.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Result
         * @static
         * @param {pb.IResult} message Result message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Result.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Result message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Result
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Result} Result
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Result.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Result();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.query = $root.pb.Query.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        if (!(message.acks && message.acks.length))
                            message.acks = [];
                        message.acks.push($root.pb.Ack.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Result message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Result
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Result} Result
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Result.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Result message.
         * @function verify
         * @memberof pb.Result
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Result.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.query != null && message.hasOwnProperty("query")) {
                var error = $root.pb.Query.verify(message.query);
                if (error)
                    return "query." + error;
            }
            if (message.acks != null && message.hasOwnProperty("acks")) {
                if (!Array.isArray(message.acks))
                    return "acks: array expected";
                for (var i = 0; i < message.acks.length; ++i) {
                    var error = $root.pb.Ack.verify(message.acks[i]);
                    if (error)
                        return "acks." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Result message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Result
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Result} Result
         */
        Result.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Result)
                return object;
            var message = new $root.pb.Result();
            if (object.query != null) {
                if (typeof object.query !== "object")
                    throw TypeError(".pb.Result.query: object expected");
                message.query = $root.pb.Query.fromObject(object.query);
            }
            if (object.acks) {
                if (!Array.isArray(object.acks))
                    throw TypeError(".pb.Result.acks: array expected");
                message.acks = [];
                for (var i = 0; i < object.acks.length; ++i) {
                    if (typeof object.acks[i] !== "object")
                        throw TypeError(".pb.Result.acks: object expected");
                    message.acks[i] = $root.pb.Ack.fromObject(object.acks[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Result message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Result
         * @static
         * @param {pb.Result} message Result
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Result.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.acks = [];
            if (options.defaults)
                object.query = null;
            if (message.query != null && message.hasOwnProperty("query"))
                object.query = $root.pb.Query.toObject(message.query, options);
            if (message.acks && message.acks.length) {
                object.acks = [];
                for (var j = 0; j < message.acks.length; ++j)
                    object.acks[j] = $root.pb.Ack.toObject(message.acks[j], options);
            }
            return object;
        };

        /**
         * Converts this Result to JSON.
         * @function toJSON
         * @memberof pb.Result
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Result.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Result
         * @function getTypeUrl
         * @memberof pb.Result
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Result.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Result";
        };

        return Result;
    })();

    return pb;
})();

module.exports = $root;

/*
 * Web
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * Generated by: https://github.com/openapitools/openapi-generator.git
 */


using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text;

namespace ReleaseApp.Updater.Model
{
    /// <summary>
    /// AppMetadata
    /// </summary>
    [DataContract(Name = "AppMetadata")]
    public partial class AppMetadata : IEquatable<AppMetadata>, IValidatableObject
    {

        /// <summary>
        /// Gets or Sets Arch
        /// </summary>
        [DataMember(Name = "arch", IsRequired = true, EmitDefaultValue = false)]
        public AppArch Arch { get; set; }
        /// <summary>
        /// Initializes a new instance of the <see cref="AppMetadata" /> class.
        /// </summary>
        [JsonConstructorAttribute]
        protected AppMetadata() { }
        /// <summary>
        /// Initializes a new instance of the <see cref="AppMetadata" /> class.
        /// </summary>
        /// <param name="name">name (required).</param>
        /// <param name="version">version (required).</param>
        /// <param name="arch">arch (required).</param>
        public AppMetadata(string name = default(string), AppVersion version = default(AppVersion), AppArch arch = default(AppArch))
        {
            Name = name;
            // to ensure "version" is required (not null)
            if (version == null)
            {
                throw new ArgumentNullException("version is a required property for AppMetadata and cannot be null");
            }
            _Version = version;
            Arch = arch;
        }

        /// <summary>
        /// Gets or Sets Name
        /// </summary>
        [DataMember(Name = "name", IsRequired = true, EmitDefaultValue = false)]
        public string Name { get; set; }

        /// <summary>
        /// Gets or Sets _Version
        /// </summary>
        [DataMember(Name = "version", IsRequired = true, EmitDefaultValue = false)]
        public AppVersion _Version { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class AppMetadata {\n");
            sb.Append("  Name: ").Append(Name).Append("\n");
            sb.Append("  _Version: ").Append(_Version).Append("\n");
            sb.Append("  Arch: ").Append(Arch).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }

        /// <summary>
        /// Returns the JSON string presentation of the object
        /// </summary>
        /// <returns>JSON string presentation of the object</returns>
        public virtual string ToJson()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this, Newtonsoft.Json.Formatting.Indented);
        }

        /// <summary>
        /// Returns true if objects are equal
        /// </summary>
        /// <param name="input">Object to be compared</param>
        /// <returns>Boolean</returns>
        public override bool Equals(object input)
        {
            return Equals(input as AppMetadata);
        }

        /// <summary>
        /// Returns true if AppMetadata instances are equal
        /// </summary>
        /// <param name="input">Instance of AppMetadata to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(AppMetadata input)
        {
            if (input == null)
            {
                return false;
            }
            return
                (
                    Name == input.Name ||
                    (Name != null &&
                    Name.Equals(input.Name))
                ) &&
                (
                    _Version == input._Version ||
                    (_Version != null &&
                    _Version.Equals(input._Version))
                ) &&
                (
                    Arch == input.Arch ||
                    Arch.Equals(input.Arch)
                );
        }

        /// <summary>
        /// Gets the hash code
        /// </summary>
        /// <returns>Hash code</returns>
        public override int GetHashCode()
        {
            unchecked // Overflow is fine, just wrap
            {
                int hashCode = 41;
                if (Name != null)
                {
                    hashCode = (hashCode * 59) + Name.GetHashCode();
                }
                if (_Version != null)
                {
                    hashCode = (hashCode * 59) + _Version.GetHashCode();
                }
                hashCode = (hashCode * 59) + Arch.GetHashCode();
                return hashCode;
            }
        }

        /// <summary>
        /// To validate all properties of the instance
        /// </summary>
        /// <param name="validationContext">Validation context</param>
        /// <returns>Validation Result</returns>
        public IEnumerable<System.ComponentModel.DataAnnotations.ValidationResult> Validate(ValidationContext validationContext)
        {
            yield break;
        }
    }

}
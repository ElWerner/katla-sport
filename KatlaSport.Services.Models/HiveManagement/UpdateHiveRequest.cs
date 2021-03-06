﻿namespace KatlaSport.Services.HiveManagement
{
    /// <summary>
    /// Represents a request for creating and updating a hive.
    /// </summary>
    public class UpdateHiveRequest
    {
        /// <summary>
        /// Gets or sets a hive name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets a hive code.
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Gets or sets a hive address.
        /// </summary>
        public string Address { get; set; }
    }
}

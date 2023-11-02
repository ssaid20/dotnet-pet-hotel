using System.Collections.Generic;
using System;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace pet_hotel
{
    public class Transaction 
    {
        public int Id { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        [Required]
        public string Description { get; set; }

        public Transaction()
        {

        }
        public Transaction(string description)
        {
            Description = description;
            Timestamp = DateTime.UtcNow;

            Description += $"\nat: {Timestamp.ToString()}";
        }
    }
}
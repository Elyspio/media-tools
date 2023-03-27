using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReleaseApp.Updater
{
    partial class AppVersion
    {
        public AppVersion Clone()
        {
            return new AppVersion
            {
                Revision = this.Revision,
                Raw = this.Raw,
                Major = this.Major,
                Minor = this.Minor,
            };
        }

        public override string ToString()
        {
            this.Raw = $"{Major}.{Minor}.{Revision}";
            return this.Raw;    
        }



    }
}
